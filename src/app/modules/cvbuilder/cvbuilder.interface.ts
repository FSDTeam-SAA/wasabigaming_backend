import { Types } from 'mongoose';

export interface IEducation {
  educationLevel: string;
  institution: string;
  grade: string;
  subject: string;
  startYear: string;
  endYear: string;
}

export interface ILeadership {
  role: string;
  organization: string;
  dateYear: string;
  description: string;
}
export interface ILegalWorkExperience
  {
    jobTitle: string,
    organization:string,
    keyResponsibilities: string,
    startYear:string,
    endYear: string,
    education: string
  };

export interface INonLegalWorkExperienceSchema
    {
      jobTitle: string,
      organization: string
      keyResponsibilities: string,
      startYear: string,
      endYear: string,
      education: string
    };
export interface IAchievements {
  skills: string[];
  recommendedSkills: string[];
}

export interface ICVbuilder {
  firstName: string;
  lastName: string;
  profession: string;
  email: string;
  phone: string;
  location: string;

  legalWorkExperience:ILegalWorkExperience[];
  nonLegalWorkExperience: INonLegalWorkExperienceSchema[];

  educationLevel: IEducation[];
  leadership: ILeadership[];
  achievements: IAchievements;

  summary: string;

  createBy?: Types.ObjectId;
  cvformet?:string;
}
