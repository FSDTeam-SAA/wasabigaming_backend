import mongoose from 'mongoose';
import { IEvent } from './event.interface';

const EventSchema = new mongoose.Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subTitle: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
    },
    thamble: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);
const Event = mongoose.model<IEvent>('Event', EventSchema);
export default Event;
