/* eslint-disable prettier/prettier */
//user-avatar.interface.ts
import { Document } from 'mongoose';

export interface UserAvatar extends Document {
  userId: number;
  avatar: string;
}
