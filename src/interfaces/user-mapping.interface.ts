/* eslint-disable prettier/prettier */
// src/interfaces/user-mapping.interface.ts
import { Document } from 'mongoose';

export interface UserMapping extends Document {
  apiUserId: number; // ID do usuário do reqres.in
  userId: string; // UUID gerado para o MongoDB
}
