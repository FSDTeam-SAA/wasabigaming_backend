import { Types } from 'mongoose';

export interface IInfoBlock {
  title?: string;
  description?: string;
  link?: string;
}

export interface ILawfirm {
  logo?: string;
  coverImage?: string;

  firmName: string;
  firmType: string;
  tags?: string[];
  headquarters: string;

  numberOfAttorneys?: number;
  foundationYear?: number;
  numberOfPartners?: number;

  website?: string;
  email?: string;
  phoneNumber?: string;
  annualRevenue?: string;

  keyHighlights?: string;

  overview?: {
    firmOverview?: string;
    establishmentDetails?: string;
    keyHighlights?: string;
  };

  recentAnnualRevenue?: IInfoBlock;
  recentWorks?: IInfoBlock;
  technologyInitiatives?: IInfoBlock;
  diversityEquityAndInclusion?: IInfoBlock;
  CSRAndProBono?: IInfoBlock;
  awardsAndRecognition?: IInfoBlock;

  aboutFirm: string;

  expertise?: string;
  internshipOpportunities?: string[];

  description: string;
  location: string;
  practiceAreas: string;

  createdBy?: Types.ObjectId;
  status?: 'approved' | 'pending' | 'rejected';

  jobs?: Types.ObjectId[];
  applyNumber?: number;

  cultureAndValue: string[];
  benefitsAndPerks: string[];

  bookmarkedUser?: Types.ObjectId[];
}
