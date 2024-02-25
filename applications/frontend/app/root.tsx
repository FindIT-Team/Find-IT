import {
  Box,
  Center,
  ChakraProvider,
  Code,
  CSSReset,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  isRouteErrorResponse,
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import React, { useContext, useEffect } from 'react';
import { ClientStyleContext, ServerStyleContext } from '~/emotion/context';
import { theme } from '~/theme';
import { Footer } from '~/components/footer';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),

  // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  // { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
  // {
  //   rel: 'stylesheet',
  //   href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
  // },
];

export async function loader() {
  return json({
    ENV: {
      DOMAIN: process.env.DOMAIN,
    },
  });
}

const Document = withEmotionCache(
  (
    { children, title }: { children: React.ReactNode; title?: string },
    emotionCache,
  ) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (
          emotionCache.sheet as unknown as {
            _insertTag: (tag: HTMLStyleElement) => void;
          }
        )._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    const data = useLoaderData<typeof loader>();

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <title>{title}</title>
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          <ChakraProvider theme={theme}>
            <CSSReset />
            {children}
            <Footer />
          </ChakraProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data?.ENV)}`,
            }}
          />
        </body>
      </html>
    );
  },
);

export default function App() {
  // throw new Error('💣💥 Booooom');

  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let errorView: React.ReactNode;
  let title: string;

  if (isRouteErrorResponse(error)) {
    title = `${error.status}: ${error.statusText} | Find IT`;
    errorView = (
      <>
        <Heading fontSize={'x-large'}>
          Something bad happened during connection
        </Heading>
        <Flex
          flexDirection={'column'}
          alignItems={'start'}
          width={'70%'}
          gap={'1vh'}
        >
          <Code color={'red'}>
            {error.status} {error.statusText}
          </Code>
          <Code color={'red'}>{error.data}</Code>
        </Flex>
      </>
    );
  } else if (error instanceof Error) {
    title = `${error.message} | Find IT`;
    errorView = (
      <>
        <Heading fontSize={'x-large'}>
          Something bad happened during runtime
        </Heading>
        <Flex
          flexDirection={'column'}
          alignItems={'start'}
          width={'70vw'}
          gap={'1vh'}
        >
          <Code color={'red'}>{error.message}</Code>
          <Box>
            <Text>Stack trace:</Text>
            <Code color={'red'}>{error.stack}</Code>
          </Box>
        </Flex>
      </>
    );
  } else {
    title = 'Unknown error | Find IT';
    errorView = (
      <>
        <Heading fontSize={'x-large'}>Something bad happened</Heading>
        <Text>But we don&apos;t know what it is 😢</Text>
      </>
    );
  }

  return (
    <Document title={title}>
      <Center height={'100vh'}>
        <Flex flexDirection={'column'} alignItems={'center'} gap={'2vh'}>
          {errorView}
        </Flex>
      </Center>
    </Document>
  );
}
