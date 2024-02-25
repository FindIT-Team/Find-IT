import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CorsConfig: CorsOptions = {
  origin: [process.env.FRONT_URL, process.env.API_URL],
  credentials: true,
};
