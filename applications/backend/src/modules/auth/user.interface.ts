import { $Enums, Subscription } from '@prisma/client';

export interface ISerializedUser {
  id: string;
}

export interface IDeserializedUser {
  id: string;
  subscription: Subscription | null;
  role: $Enums.UserRole;
}
