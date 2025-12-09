import { Types } from 'mongoose';

export interface ITask {
  title?: string;
  course: Types.ObjectId;
  dueDate?: Date;
  totalStudents?: number;
  status?: 'pending' | 'completed' | 'in progress';
  submission?: Types.ObjectId[];
  createdBy: Types.ObjectId;
}
