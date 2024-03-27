import { Express } from 'express';

export function authenticationMiddleware() {
  return (
    req: Express.Request,
    res: Express.Response,
    next: (err?: any) => void,
  ) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      next(new Error('Unauthorized'));
    }
  };
}
