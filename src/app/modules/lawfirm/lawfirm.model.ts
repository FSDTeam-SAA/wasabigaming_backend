import mongoose, { Schema, Model, Types } from 'mongoose';
import { ILawfirm } from './lawfirm.interface';

// const SectionUrlSchema = new Schema(
//   {
//     keyHighlights: { type: String, default: '' },
//     practiceAreas: { type: String, default: '' },
//     technologyInitiatives: { type: String, default: '' },
//     recentWorks: { type: String, default: '' },
//     deAndIUrl: { type: String, default: '' },
//     csrUrl: { type: String, default: '' },
//     awardsUrl: { type: String, default: '' },
//   },
//   { _id: false },
// );

// const PracticeAndWorkSchema = new Schema(
//   {
//     practiceAreas: { type: [String], default: [] },
//     practiceAreaDescription: { type: String, default: '' },
//     recentWorks: { type: String, default: '' },
//   },
//   { _id: false },
// );

// const InitiativesSchema = new Schema(
//   {
//     technologyInitiatives: { type: String, default: '' },
//     awardsAndRecognition: { type: String, default: '' },
//   },
//   { _id: false },
// );

// const CsrAndDeAndISchema = new Schema(
//   {
//     diversityEquityAndInclusion: { type: String, default: '' },
//     csrAndProBono: { type: String, default: '' },
//   },
//   { _id: false },
// );

const LawfirmSchema = new Schema<ILawfirm>(
  {
    logo: { type: String, default: '' },
    coverImage: { type: String, default: '' },

    firmName: { type: String },
    firmType:{type:String},
    tags: [{type:String}],
    headquarters: { type: String },

    numberOfAttorneys: { type: Number, default: 0 },
    foundationYear: { type: Number, default: null },
    numberOfPartners: { type: Number, default: 0 },

    website: { type: String, default: '' },
    email: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    annualRevenue: { type: String, default: '' },

     keyHighlights: { type: String, default: '' },
    // practiceAndWork: { type: PracticeAndWorkSchema, default: () => ({}) },
    // initiatives: { type: InitiativesSchema, default: () => ({}) },
    // csrAndDeAndI: { type: CsrAndDeAndISchema, default: () => ({}) },

    awardsAndRecognition: { type: String, default: '' },
    aboutFirm: { type: String },

    expertise: { type: String, default: '' },
    internshipOpportunities: [{ type: String, default: '' }],
    description: { type: String },
    location: { type: String },
    practiceAreas:{type:String},

    createdBy: { type: Types.ObjectId, ref: 'User', default: null },
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: 'pending',
    },
    jobs: { type: [Types.ObjectId], ref: 'Job', default: [] },
    applyNumber: {Type: Number},
    cultureAndValue:[{type:String}],
    benefitsAndPerks:[{type:String}],
  },
  { timestamps: true },
);

const Lawfirm: Model<ILawfirm> =
  mongoose.models.Lawfirm || mongoose.model<ILawfirm>('Lawfirm', LawfirmSchema);

export default Lawfirm;
