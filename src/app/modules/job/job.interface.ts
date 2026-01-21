import { Types } from 'mongoose';
import { required } from 'zod/v4/core/util.cjs';

export interface IJob {
  title: string;
  location: string;
  companyName: string;
  companyType: string;
  postedBy: string; // e.g., "BPP University Limited"
  level?: string;
  salaryRange: string; // e.g., "£27,000.00 - £30,704.00 Yearly"
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
