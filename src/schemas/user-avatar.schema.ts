/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

export const UserAvatarSchema = new Schema({
  userId: Number,
  avatar: String,
});
