import mongoose from 'mongoose';
import { ICourse } from './course.interface';

const courseSchema = new mongoose.Schema<ICourse>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    gradeLevel: { type: String },
    category: { type: String },
    courseVideo: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const Course = mongoose.model<ICourse>('Course', courseSchema);
export default Course;
