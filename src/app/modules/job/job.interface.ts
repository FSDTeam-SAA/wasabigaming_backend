import { Types } from 'mongoose';
import { required } from 'zod/v4/core/util.cjs';

export interface IJob {
  title: string;
  location: string;
  companyName: string;
  companyType: string;
  postedBy: string; 
  level?: string;
  salaryRange: string;
  startDate: string;
  applicationDeadline: string;
  jobId: string | number;
  jobStatus: 'Open' | 'Closed';
  description: string;
  responsibilities: string[];
  additionalInfo?: string;
  status: 'active' | 'inactive';
  createBy?: Types.ObjectId;
  requiredSkills: string[];
  url: string;
  companyId?: Types.ObjectId;
  applicants?: Types.ObjectId[];
}
