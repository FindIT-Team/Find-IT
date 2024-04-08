import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import envOnly from 'vite-env-only';
import tsconfigPaths from 'vite-tsconfig-paths';

installGlobals();

export default ({ mode }: ConfigEnv) => {
  // Here we add env vars from .env files to process.env.
  // Note the last arg is a blank string so that all env vars
  // are loaded, not just those starting with "VITE_"
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return defineConfig({
    server: {
      host: '0.0.0.0',
      port: Number(process.env.PORT),
    },
    plugins: [
      remix({
        appDirectory: 'src/app',
        routes: async (defineRoutes) => {
          return defineRoutes((route) => {
            // Home
            route('', '../pages/home/index.tsx', { index: true });

            // Auth layout
            route('/auth', '../pages/layouts/auth/index.tsx', () => {
              route('login', '../pages/auth/login/index.tsx');
              route('registration', '../pages/auth/registration/index.tsx');
            });

            // Navigation layout
            route('/', '../pages/layouts/nav/index.tsx', () => {
              // Dashboard
              route('dashboard', '../pages/dashboard/index.tsx');

              // Settings
              route(
                'settings',
                '../pages/layouts/settings-nav/index.tsx',
                () => {
                  route('profile', '../pages/settings/profile/index.tsx', {
                    index: true,
                  });
                },
              );

              // Users
              route('users', '../pages/users/index.tsx', { index: true });

              // Projects
              route('projects', '../pages/projects/index.tsx', { index: true });

              // User
              route('users/:username', '../pages/user/index.tsx', {
                index: true,
              });

              // Project
              route('projects/:projectId', '../pages/dsahboard/index.tsx', {
                index: true,
              });
            });

            // Dashboard
            // route('/auth', 'routes/auth/layout.tsx', () => {
            //   route('registration', 'routes/auth/registration/index.tsx', {
            //     index: true,
            //   });
            //   route('login', 'routes/auth/login/index.tsx', {
            //     index: true,
            //   });
            // });
            //
            // // Dashboard
            // route('', 'routes/_nav/layout.tsx', () => {
            //   route('/dashboard', 'routes/_nav/dashboard/index.tsx', {
            //     index: true,
            //   });
            //   route('/settings', 'routes/_nav/settings/layout.tsx', () => {
            //     route('profile', 'routes/_nav/settings/profile/index.tsx', {
            //       index: true,
            //     });
            //   });
            //   route('/users', 'routes/_nav/users/index.tsx', {
            //     index: true,
            //   });
            //   route('/users/:username', 'routes/_nav/user/index.tsx', {
            //     index: true,
            //   });
            //   route('/dsahboard', 'routes/_nav/dsahboard/index.tsx', {
            //     index: true,
            //   });
            //   route('/projects', 'routes/_nav/projects/index.tsx', {
            //     index: true,
            //   });
            // });
          });
        },
      }),
      envOnly(),
      tsconfigPaths(),
    ],
  });
};
