// community.model.ts
import { Schema, model } from 'mongoose';
import { ICommunity } from './joinCommunity.interface';

const communitySchema = new Schema<ICommunity>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [1, 'Age must be at least 1'],
    },
    cityOrTown: {
      type: String,
      required: [true, 'City or town is required'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    yearGroup: {
      type: String,
      required: [true, 'Year group is required'],
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