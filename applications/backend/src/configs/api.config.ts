import { ControllerOptions } from '@nestjs/common';

export const ApiConfig = (options?: ControllerOptions): ControllerOptions => {
  return { ...options, host: process.env.API_SUBDOMAIN };
};
