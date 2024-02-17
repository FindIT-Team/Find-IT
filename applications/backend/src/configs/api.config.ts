import { ControllerOptions } from '@nestjs/common';

export const ApiConfig = (options?: ControllerOptions): ControllerOptions => {
  return { ...options, host: `api.${process.env.DOMAIN}` };
};
