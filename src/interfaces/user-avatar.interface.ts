/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface UserAvatar extends Document {
  userId: number;
  avatar: string;
}
