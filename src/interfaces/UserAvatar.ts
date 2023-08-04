/* eslint-disable prettier/prettier */
// interfaces/UserAvatar.ts

import { Document, Schema, Types } from 'mongoose';

export interface UserAvatar extends Document {
  userId: Types.ObjectId;
  avatar: string;
  hash: string; // Mantenha o atributo hash
}

export const UserAvatarSchema = new Schema({
  userId: Schema.Types.ObjectId,
  avatar: String,
  hash: String, // Mantenha o atributo hash
});
