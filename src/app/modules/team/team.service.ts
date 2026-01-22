import AppError from "../../error/appError";
import { fileUploader } from "../../helper/fileUploder";
import pagination, { IOption } from "../../helper/pagenation";
import Team from "./team.model"


const createTeam = async (
  payload: any,
  files?: Express.Multer.File[]
) => {
  const teamsPayload = Array.isArray(payload) ? payload : [payload];
  const createdTeams = [];

  for (let i = 0; i < teamsPayload.length; i++) {
    const teamData = teamsPayload[i];
    const team = await Team.create(teamData);

    if (files && files[i]) {
      const uploadProfile = await fileUploader.uploadToCloudinary(files[i]!);

      if (!uploadProfile?.url) {
        throw new AppError(400, 'Failed to upload profile image');
      }

      team.image = uploadProfile.url;
      await team.save();
    }

    createdTeams.push(team);
  }

  return createdTeams;
};


const getAllTeams = async(options:IOption) => {
    const { page, limit, skip, sortBy, sortOrder } = pagination(options);

     const andCondition: any[] = [];

    
      const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    
      const result = await Team.find(whereCondition)
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder } as any);
    
      if (!result) {
        throw new AppError(404, 'Lawfirm not found');
      }
    
      const total = await Team.countDocuments(whereCondition);
    
      return {
        data: result,
        meta: {
          total,
          page,
          limit,
        },
      };
}

const deleteTeam = async(teamId:string) => {

    const result = await Team.findByIdAndDelete(teamId);

    return result;
}

const updateTeam = async (teamId: string, payload: any) => {
  
    const team = await Team.findById(teamId);
  console.log(team);
  if (!team) {
    throw new AppError(404, 'Team not found');
  }

  const updatedTeam = await Team.findByIdAndUpdate(
    teamId,            // ✅ correct
    { $set: payload }, // ✅ safer update
    { new: true, runValidators: true }
  );

  return updatedTeam;
};



export const teamService = {
    createTeam,
    getAllTeams,
    deleteTeam,
    updateTeam
}

