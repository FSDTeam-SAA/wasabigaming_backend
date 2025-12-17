import { Schema, model } from 'mongoose';
import { IPsychometric } from './psychometric.interface';

const PsychometricSchema = new Schema<IPsychometric>(
  {
    title: { type: String, required: true },
    description: String,
    durationMin: Number,
    type: {
      type: String,
      required: true,
    },

    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
        difficulty: {
          type: String,
          enum: ['easy', 'medium', 'hard'],
        },
        skill: String,
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Psychometric = model('Psychometric', PsychometricSchema);
export default Psychometric;
