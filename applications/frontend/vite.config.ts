import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default ({ mode }: ConfigEnv) => {
  // Here we add env vars from .env files to process.env.
  // Note the last arg is a blank string so that all env vars
  // are loaded, not just those starting with "VITE_"
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return defineConfig({
    server: {
      host: process.env.DOMAIN,
      port: 3000,
    },
    plugins: [
      remix({
        routes: async (defineRoutes) => {
          return defineRoutes((route) => {
            route('/auth', 'routes/auth/layout.tsx', () => {
              route('registration', 'routes/auth/registration/route.tsx', {
                index: true,
              });
              route('login', 'routes/auth/login/route.tsx', {
                index: true,
              });
            });

            // Dashboard
            route('', 'routes/_nav/layout.tsx', () => {
              route('/dashboard', 'routes/_nav/dashboard/route.tsx', {
                index: true,
              });
              route('/settings', 'routes/_nav/settings/layout.tsx', () => {
                route('profile', 'routes/_nav/settings/profile/route.tsx', {
                  index: true,
                });
              });
              route('/users', 'routes/_nav/users/route.tsx', {
                index: true,
              });
              route('/users/:username', 'routes/_nav/user/route.tsx', {
                index: true,
              });
              route('/project', 'routes/_nav/project/route.tsx', {
                index: true,
              });
            });
          });
        },
      }),
      tsconfigPaths(),
    ],
  });
};
