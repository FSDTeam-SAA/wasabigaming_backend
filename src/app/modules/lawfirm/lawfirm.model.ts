import mongoose, { Schema, Model, Types } from 'mongoose';
import { ILawfirm, IInfoBlock } from './lawfirm.interface';

const InfoBlockSchema = new Schema<IInfoBlock>(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    link: { type: String, default: '' },
  },
  { _id: false }
);

const LawfirmSchema = new Schema<ILawfirm>(
  {
    logo: { type: String, default: '' },
    coverImage: { type: String, default: '' },

    firmName: { type: String, required: true },
    firmType: { type: String, required: true },
    tags: [{ type: String }],
    headquarters: { type: String},

    numberOfAttorneys: { type: Number, default: 0 },
    foundationYear: { type: Number, default: null },
    numberOfPartners: { type: Number, default: 0 },

    website: { type: String, default: '' },
    email: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    annualRevenue: { type: String, default: '' },

    keyHighlights: { type: String, default: '' },

    overview: {
      firmOverview: { type: String, default: '' },
      establishmentDetails: { type: String, default: '' },
      keyHighlights: { type: String, default: '' },
    },

    recentAnnualRevenue: { type: InfoBlockSchema, default: () => ({}) },
    recentWorks: { type: InfoBlockSchema, default: () => ({}) },
    technologyInitiatives: { type: InfoBlockSchema, default: () => ({}) },
    diversityEquityAndInclusion: { type: InfoBlockSchema, default: () => ({}) },
    CSRAndProBono: { type: InfoBlockSchema, default: () => ({}) },
    awardsAndRecognition: { type: InfoBlockSchema, default: () => ({}) },

    aboutFirm: { type: String, required: true },

    expertise: { type: String, default: '' },
    internshipOpportunities: [{ type: String }],

    description: { type: String},
    location: { type: String, required: true },
    practiceAreas: { type: String},

    createdBy: { type: Types.ObjectId, ref: 'User', default: null },

    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: 'pending',
    },

    jobs: [{ type: Types.ObjectId, ref: 'Job' }],
    applyNumber: { type: Number, default: 0 },

    cultureAndValue: [{ type: String }],
    benefitsAndPerks: [{ type: String }],

    bookmarkedUser: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);


const Lawfirm: Model<ILawfirm> =
  mongoose.models.Lawfirm || mongoose.model<ILawfirm>('Lawfirm', LawfirmSchema);

export default Lawfirm;
