/* eslint-disable prettier/prettier */
// src/schemas/user-mapping.schema.ts
import { Schema } from 'mongoose';

export const UserMappingSchema = new Schema({
  apiUserId: Number,
  userId: String,
});
