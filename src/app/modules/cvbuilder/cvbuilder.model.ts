import mongoose, { Schema } from 'mongoose';
import { ICVbuilder } from './cvbuilder.interface';

const EducationSchema = new Schema(
  {
    educationLevel: { type: String, required: true },
    institution: { type: String, required: true },
    grade: { type: String },
    subject: { type: String },
    startYear: { type: String, required: true },
    endYear: { type: String, required: true },
  },
  { _id: false },
);
const LegalWorkExperience = new Schema(
  {
    jobTitle: {type: String},
    organization:{type: String},
    keyResponsibilities: {type: String},
    startYear: {type: String},
    endYear: {type: String},
    education:{type:String}
  },
  { _id: false },
);
const NonLegalWorkExperienceSchema = new Schema(
  {
    jobTitle: {type: String},
    organization: {type: String},
    keyResponsibilities: {type: String},
    startYear: {type: String},
    endYear: {type: String },
    education: {type: String}
  },
  {_id: false },
);

const LeadershipSchema = new Schema(
  {
    role: { type: String, required: true },
    organization: { type: String, required: true },
    dateYear: { type: String, required: true },
    description: { type: String },
  },
  { _id: false },
);

const AchievementSchema = new Schema(
  {
    skills: { type: [String], default: [] },
    recommendedSkills: { type: [String], default: [] },
  },
  { _id: false },
);

const CVBuilderSchema = new Schema<ICVbuilder>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profession: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    attemptNumber: { type: Number, default: 1 },

    legalWorkExperience: {
      type: [LegalWorkExperience],
      default: []
    },
    nonLegalWorkExperience: {
      type: [NonLegalWorkExperienceSchema],
      default: [],
    },

    educationLevel: {
      type: [EducationSchema],
      default: [],
    },

    leadership: {
      type: [LeadershipSchema],
      default: [],
    },

    achievements: {
      type: AchievementSchema,
      default: {},
    },

    summary: { type: String },

    createBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cvformet: { type: String },
  },
  {
    timestamps: true,
  },
);

const CVbuilder = mongoose.model<ICVbuilder>('CVbuilder', CVBuilderSchema);
export default CVbuilder;
