import {
  isRouteErrorResponse,
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { useEmotion } from './emotion/use-emotion.hook';
import {
  Box,
  Center,
  ChakraProvider,
  Code,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import { Footer } from '~/components/footer';
import React from 'react';
import { theme } from './theme';

export async function loader() {
  return json({
    ENV: {
      FRONT_URL: process.env.FRONT_URL,
      API_URL: process.env.API_URL,
    },
  });
}

export const Layout = withEmotionCache(
  ({ children }: { children: React.ReactNode }, emotionCache) => {
    const { serverStyleData } = useEmotion(emotionCache);

    const data = useLoaderData<typeof loader>();

    return (
      <html lang="ru">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
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
            {children}
            <Footer />
          </ChakraProvider>
          <ScrollRestoration />
          <Scripts />
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
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  let errorView: React.ReactNode;

  if (isRouteErrorResponse(error)) {
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
    errorView = (
      <>
        <Heading fontSize={'x-large'}>Something bad happened</Heading>
        <Text>But we don&apos;t know what it is 😢</Text>
      </>
    );
  }

  return (
    <Center height={'100vh'}>
      <Flex flexDirection={'column'} alignItems={'center'} gap={'2vh'}>
        {errorView}
      </Flex>
    </Center>
  );
}
