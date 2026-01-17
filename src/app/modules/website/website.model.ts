// import mongoose from 'mongoose';
// import { IWebsite } from './website.interface';

import mongoose from 'mongoose';
import { IManageWebsite } from './website.interface';

// const SectionSchema = new mongoose.Schema<IWebsite>(
//   {
//     key: { type: String, required: true, unique: true, index: true },
//     type: { type: String, required: true },
//     title: { type: String },
//     content: { type: mongoose.Schema.Types.Mixed, default: {} },
//     meta: { type: mongoose.Schema.Types.Mixed, default: {} },
//     createBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

// const Website = mongoose.model<IWebsite>('Website', SectionSchema);
// export default Website;

const webSiteSchema = new mongoose.Schema<IManageWebsite>(
  {
    title: { type: String },
    description: { type: String },
    thumbnail: { type: [String] },
    type: { type: String },
    subtitle: { type: String },
    primaryButton: { type: String },
    secondaryButton: { type: String },
  },
  { timestamps: true },
);

const Website = mongoose.model<IManageWebsite>('Website', webSiteSchema);

export default Website;
