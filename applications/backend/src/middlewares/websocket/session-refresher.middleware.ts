import { Express } from 'express';

export function sessionRefresherMiddleware() {
  return (
    req: Express.Request,
    res: Express.Response,
    next: (err?: any) => void,
  ) => {
    try {
      req.session.touch();
      next();
    } catch (e) {
      next(e);
    }
  };
}
