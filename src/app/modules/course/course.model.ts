import mongoose from 'mongoose';
import { ICourse } from './course.interface';

const courseVideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    time: { type: String, required: true },
  },
  { _id: false },
);

const courseSchema = new mongoose.Schema<ICourse>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    gradeLevel: { type: String },
    category: { type: String },
    courseVideo: [courseVideoSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    coursePrice: { type: Number, default: 0 },
    // isCourseFree: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Course = mongoose.model<ICourse>('Course', courseSchema);
export default Course;
