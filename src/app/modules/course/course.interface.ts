import { Types } from 'mongoose';

export interface ICourse {
  name: string;
  description: string;
  gradeLevel?: string;
  category?: string;
  courseVideo?: string;
  createdBy?: Types.ObjectId;
  status?: 'active' | 'inactive';
  enrolledStudents?: Types.ObjectId[];
}
