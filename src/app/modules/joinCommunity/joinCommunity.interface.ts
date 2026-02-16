// community.interface.ts
import { Document, Types } from 'mongoose';

export interface ICommunity extends Document {
  fullName?: string;
  email?: string;
  age?: number;
  cityOrTown?: string;
  phoneNumber?: string;
  yearGroup?: string;
  status?: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}