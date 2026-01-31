import { Types } from 'mongoose';

export interface IEducation {
  institution: string;
  degree: string;
  year: number;
}

export interface IExperience {
  company: string;
  role: string;
  duration: string;
}

export interface IUser {
  firstName?: string;
  lastName?: string;
  schoolName?: string;
  schoolType?: string;
  schoolStatus?: 'approved' | 'pending' | 'rejected';
  aboutSchool?: string;
  email: string;
  password: string;
  role: 'student' | 'school' | 'admin';
  profileImage?: string;
  phone?: string;
  otp?: string;
  otpExpiry?: Date;
  verified?: boolean;
  registered?: boolean;
  stripeAccountId?: string;
  status?: 'active' | 'inactive';
  address?: string;
  course?:Types.ObjectId[];
  
  jobTitle?: string;
  company?: string;
  bio?: string;
  socileLinks?: {
    name: string;
    link: string;
  }[];
  schoolCategory:string;

  schoolId?: Types.ObjectId; // If student belongs to a school
  education?: IEducation[];
  experience?: IExperience[];
  skills?: string[];
  grade?: string;

  isSubscription?: boolean;
  subscriptionExpiry?: Date | null;
  subscription?: Types.ObjectId;
  loginHistory: [{
    device: string,
    ipAddress: string,
    loginTime: {
      type: Date
    }
  }],
  shareLink?:string;

  createdAt: Date;
  updatedAt: Date;
}
