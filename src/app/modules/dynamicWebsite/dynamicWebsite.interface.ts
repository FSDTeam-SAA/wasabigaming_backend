// dynamicWebsite.interface.ts
import { Document, Types } from 'mongoose';

export interface IDynamicWebsite extends Document {
  title?: string;
  image?: string;
  category?: string;
  status?: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}