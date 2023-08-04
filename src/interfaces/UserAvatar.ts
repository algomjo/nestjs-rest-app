/* eslint-disable prettier/prettier */
// interfaces/user-avatar.interface.ts

import { Document } from 'mongoose';

export interface UserAvatar extends Document {
  userId: number;
  avatar: string;
  hash: string;
}
