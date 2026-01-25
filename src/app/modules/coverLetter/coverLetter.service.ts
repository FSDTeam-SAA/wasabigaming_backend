import { fileUploader } from "../../helper/fileUploder";
import { ICoverLetter } from "./coverLetter.interface";
import CoverLetter from "./coverLetter.model";
import { updatedCoverLetter } from '../../helper/aiEndpoint';
import pagination, { IOption } from "../../helper/pagenation";
import AppError from "../../error/appError";

const makeCoverLetter = async(
    payload: ICoverLetter,
    file?: Express.Multer.File,
    userId?: string
) => {
    let aiResponse = null;
    
    if (file) {
        aiResponse = await updatedCoverLetter(payload.jobDescription, file);
    }
    
    const coverLetterData: any = {
        ...payload,
        createBy: userId
    };
    
    if (aiResponse?.coverLetter) {
        coverLetterData.coverLetter = aiResponse.coverLetter;
    }
     if (aiResponse?.applicant) {
        coverLetterData.applicant = aiResponse.applicant;
    }
   
    const coverLetter = await CoverLetter.create(coverLetterData);
    
    if (file) {
        const uploadCoverLetter = await fileUploader.uploadToCloudinary(file);
        coverLetter.uploadCv = uploadCoverLetter.url;
        await coverLetter.save();
    }
    
    return { savedData: coverLetter };
}

const getAllCoverLetter = async(userId: String, options:IOption) => {

  const { page, limit, skip, sortBy, sortOrder } = pagination(options);

  const andCondition: any[] = [];
  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const result = await CoverLetter.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder } as any)
  const total = await CoverLetter.countDocuments(whereCondition);

  return { data: result, meta: { total, page, limit } };
}


const getCoverLetterById = async(id:string) => {

    const coverLetter = await CoverLetter.findById(id!);
    if(!coverLetter){
        throw new AppError(404,  "Cover Letter not found");
    }

    return coverLetter;
}

const deleteCoverLetterById = async(id:string) => {

    const coverLetter = await CoverLetter.findByIdAndDelete(id);
     if(!coverLetter){
        throw new AppError(404,  "Cover Letter not found");
    }

    return coverLetter;
}

export const coverLetterService = {
    makeCoverLetter,
    getAllCoverLetter,
    getCoverLetterById,
    deleteCoverLetterById
}