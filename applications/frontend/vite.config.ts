import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      routes: async (defineRoutes) => {
        // If you need to do async work, do it before calling `defineRoutes`, we use
        // the call stack of `route` inside to set nesting.

        return defineRoutes((route) => {
          route('/auth', 'routes/auth/layout.tsx', () => {
            route('registration', 'routes/auth/registration/route.tsx');
            route('login', 'routes/auth/login/route.tsx');
          });

          // Dashboard
          route('', 'routes/_nav/layout.tsx', () => {
            route('/dashboard', 'routes/_nav/dashboard/route.tsx');
            route('/settings', 'routes/_nav/settings/layout.tsx', () => {
              route('profile', 'routes/_nav/settings/profile/route.tsx');
            });
            route('/users', 'routes/_nav/users/route.tsx');
            route('/user', 'routes/_nav/user/route.tsx');
            route('/project', 'routes/_nav/project/route.tsx');
          });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
