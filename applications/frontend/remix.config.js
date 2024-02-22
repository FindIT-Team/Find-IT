/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route('/auth/registration', 'routes/auth/registration/route.tsx', {
        index: true,
      });
      route('/auth/login', 'routes/auth/login/route.tsx', {
        index: true,
      });
    });
  },
};
