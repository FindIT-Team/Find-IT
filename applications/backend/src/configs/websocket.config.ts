import { CorsConfig } from './cors.config';

export const websocketConfig = (path: string) => {
  return { cors: CorsConfig, path, cookie: true };
};
