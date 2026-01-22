import mongoose from 'mongoose';
import { ICard } from './card.interface';

const cardSchema = new mongoose.Schema<ICard>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true },
);

const Card = mongoose.model<ICard>('Card', cardSchema);
export default Card;
