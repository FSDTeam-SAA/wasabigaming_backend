import { Types } from 'mongoose';

export interface ILawfirm {
  logo?: string;
  coverImage?: string;

  firmName: string;
  tagline?: string;
  headquarters: string;

  numberOfAttorneys?: number;
  foundationYear?: number;
  numberOfPartners?: number;

  website?: string;
  email?: string;
  phoneNumber?: string;
  annualRevenue?: string;

  sectionUrl?: {
    keyHighlights?: string;
    practiceAreas?: string;
    technologyInitiatives?: string;
    recentWorks?: string;
    deAndIUrl?: string;
    csrUrl?: string;
    awardsUrl?: string;
  };

  overview?: {
    firmOverview?: string;
    establishmentDetails?: string;
    keyHighlights?: string;
  };

  practiceAndWork?: {
    practiceAreas?: string[];
    practiceAreaDescription?: string;
    recentWorks?: string;
  };

  initiatives?: {
    technologyInitiatives?: string;
    awardsAndRecognition?: string;
  };

  csrAndDeAndI?: {
    diversityEquityAndInclusion?: string;
    csrAndProBono?: string;
  };

  awardsAndRecognition?: string;
  aboutFirm: string;

  expertise?: string;
  internshipTraining?: string;

  description: string;
  location: string;

  createdBy?: Types.ObjectId;
  status?: 'approved' | 'pending' | 'rejected';

  applyNumber?: Types.ObjectId[];
}
