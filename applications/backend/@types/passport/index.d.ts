import { IDeserializedUser } from '../../src/modules/auth/user.interface';

declare global {
  namespace Express {
    interface User extends IDeserializedUser {}

    interface Request {
      user: User;
    }
  }
}
