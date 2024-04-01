import { SetMetadata } from '@nestjs/common';

export const AuthenticatedRequest = (isAuthenticated?: boolean) =>
  SetMetadata(
    'authenticated',
    isAuthenticated !== undefined ? isAuthenticated : true,
  );
