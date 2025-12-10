import { Types } from 'mongoose';

export type TCart =
  | 'cta'
  | 'photo'
  | 'backgroundBanner'
  | 'psychometric'
  | 'event'
  | 'teamPhoto'
  | string;

export interface IWebsite {
  createBy: Types.ObjectId;
  key: string; // unique key like "home.cta.main" or "manage.website"
  type: TCart;
  title?: string;
  content: any; // flexible content (object/array/string)
  meta?: Record<string, any>;
}
