import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import { Box, ChakraProvider, Heading } from '@chakra-ui/react';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ChakraProvider>
          <Outlet />
        </ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error, 'dasdakk');
  return (
    <ChakraProvider>
      <Box>
        <Heading as="h1" bg="blue.500">
          [ErrorBoundary]: There was an error: {JSON.stringify(error)}
        </Heading>
      </Box>
    </ChakraProvider>
  );
}
