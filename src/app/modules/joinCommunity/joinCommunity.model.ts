// community.model.ts
import { Schema, model } from 'mongoose';
import { ICommunity } from './joinCommunity.interface';

const communitySchema = new Schema<ICommunity>(
  {
    // About You
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
      min: [16, 'Minimum age is 16'],
    },
    location: {
      type: String,
      trim: true,
    },
    raceEthnicity: {
      type: String,
      trim: true,
    },
    yearGroup: {
      type: String,
    },

    // Career Interests
    industry: {
      type: String,
    },
    pathway: {
      type: String,
    },

    // Help Us Support You
    firstInFamilyToAttendUni: {
      type: String,
    },
    receivedFreeSchoolMeals: {
      type: String,
    },
    careExperience: {
      type: String,
    },
    homePostcode: {
      type: String,
      trim: true,
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
