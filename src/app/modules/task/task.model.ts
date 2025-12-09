import mongoose from 'mongoose';
import { ITask } from './task.interface';

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    dueDate: { type: Date, required: true },
    totalStudents: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'in progress'],
      default: 'pending',
    },
    submission: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
