import { Types } from 'mongoose';

export interface ICourse {
  name: string;
  description: string;
  gradeLevel?: string;
  category?: string;
  courseVideo?: {
    _id?: Types.ObjectId;
    title: string;
    url: string;
    time: string;
    quiz?: Types.ObjectId | Types.ObjectId[] | null;
  }[];
  createdBy?: Types.ObjectId;
  status?: 'active' | 'inactive';
  enrolledStudents?: Types.ObjectId[];
  coursePrice?: number;
  isCourseFree?: boolean;
}
