import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IDeserializedUser, ISerializedUser } from './user.interface';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly databaseService: DatabaseService) {
    super();
  }

  async serializeUser(
    { id }: IDeserializedUser,
    done: (err: Error | null, payload: ISerializedUser) => void,
  ) {
    done(null, { id });
  }

  async deserializeUser(
    { id }: ISerializedUser,
    done: (err: Error | null, user: IDeserializedUser | null) => void,
  ) {
    const user: IDeserializedUser | null =
      await this.databaseService.user.findUnique({
        where: { id },
        select: { id: true, subscriptions: true, role: true },
      });
    done(null, user);
  }
}
