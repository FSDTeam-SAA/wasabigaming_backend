import pick from "../../helper/pick";
import catchAsync from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendResponse";
import { teamService } from "./team.service";

const createTeam = catchAsync(async (req, res) => {
  const files = req.files as Express.Multer.File[];

  const formData = req.body.data
    ? JSON.parse(req.body.data)
    : req.body;

  const result = await teamService.createTeam(formData, files);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Teams created successfully',
    data: result,
  });
});


const getAllteams = catchAsync(async(req , res) => {

    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await teamService.getAllTeams(options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Get all team data successfully',
        data: result,
    })
})

const deleteTeam = catchAsync(async(req , res) => {

    const { id }  = req.params;
    const result = await teamService.deleteTeam( id! );

     sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Team deleted  successfully',
        data: result,
    })
})

const updateTeam = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await teamService.updateTeam(id!, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Team updated successfully',
    data: result,
  });
});


export const teamController = {
    createTeam,
    getAllteams,
    deleteTeam,
    updateTeam
}