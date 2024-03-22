import { $Enums, Subscription } from '@prisma/client';

export interface ISerializedUser {
  id: string;
}

export interface IDeserializedUser {
  id: string;
  subscriptions: Subscription[] | null;
  role: $Enums.UserRole;
}
