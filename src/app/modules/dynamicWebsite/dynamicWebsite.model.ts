// dynamicWebsite.model.ts
import { Schema, model } from 'mongoose';
import { IDynamicWebsite } from './dynamicWebsite.interface';

const dynamicWebsiteSchema = new Schema<IDynamicWebsite>(
  {
    title: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const DynamicWebsite = model<IDynamicWebsite>('DynamicWebsite', dynamicWebsiteSchema);

export default DynamicWebsite;