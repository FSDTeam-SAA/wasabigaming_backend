import { Types } from 'mongoose';

export interface IJob {
  title: string;
  location: string;
  companyName: string;
  companyType: string;
  postedBy: string; // e.g., "BPP University Limited"
  level?: string;
  salaryRange: string; // e.g., "£27,000.00 - £30,704.00 Yearly"
  startDate: Date;
  applicationDeadline: Date;
  jobId: string | number;
  jobStatus: 'Open' | 'Closed';
  description: string;
  responsibilities: string[];
  additionalInfo?: string;
  status: 'active' | 'inactive';
  createBy?: Types.ObjectId;
}
