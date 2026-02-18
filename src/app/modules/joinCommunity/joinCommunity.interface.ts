// community.interface.ts
import { Document } from 'mongoose';

export type CommunityStatus = 'active' | 'inactive' | 'pending';

export interface ICommunity extends Document {
  // About You
  fullName: string;
  email: string;
  age: number;
  location: string;
  raceEthnicity?: string;
  yearGroup: string;

  // Career Interests
  industry: string;
  pathway: string;

  // Support Section
  firstInFamilyToAttendUni?: string;
  receivedFreeSchoolMeals?: string;
  careExperience?: string;
  homePostcode?: string;

  status: CommunityStatus;

  createdAt: Date;
  updatedAt: Date;
}
