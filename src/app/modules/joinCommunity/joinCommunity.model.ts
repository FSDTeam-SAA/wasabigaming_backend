// community.model.ts
import { Schema, model } from 'mongoose';
import { ICommunity } from './joinCommunity.interface';

const communitySchema = new Schema<ICommunity>(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      min: [1, 'Age must be at least 1'],
    },
    cityOrTown: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    yearGroup: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Community = model<ICommunity>('Community', communitySchema);

export default Community;