import mongoose from 'mongoose';
import { IInviteStudent } from './invite_students.interface';

const inviteStudentSchema = new mongoose.Schema<IInviteStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String},
    url: { type: String },
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true },
);

const InviteStudent = mongoose.model<IInviteStudent>('InviteStudent', inviteStudentSchema);
export default InviteStudent;