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
  findType: string;
  organization: string;
  dateYear: string;
  description: string;
}

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

  ligleJobTitle: string;
  ligleOrganization: string;
  ligleKeyResponsibilities: string;
  ligleStartYear: string;
  ligleEndYear?: string;
  ligleEducation?: string;

  notLigleJobTitle: string;
  notLigleOrganization: string;
  notLigleKeyResponsibilities: string;
  notLigleStartYear: string;
  notLigleEndYear?: string;
  notLigleEducation?: string;

  educationLevel: IEducation[];
  leadership: ILeadership[];
  achievements: IAchievements;

  summary: string;

  createBy?: Types.ObjectId;
}
