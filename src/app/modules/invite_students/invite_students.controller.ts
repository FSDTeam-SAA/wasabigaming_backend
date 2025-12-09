// // ==================== contact.controller.ts ====================
// import { contactService } from './contact.service';
// import catchAsync from '../../utils/catchAsycn';
// import sendResponse from '../../utils/sendResponse';
// import pick from '../../helper/pick';


// const createContact = catchAsync(async(req, res) =>  {
   
//       const contact = await contactService.createContact(req.body);

//       sendResponse(res, {
//         statusCode: 201,
//         success: true,
//         message: 'Contact created successfully',
//         data: contact,
//       });
// });

// const getAllContacts = catchAsync(async(req, res) =>  {

//       const filters = pick(req.query, [
//             'searchTerm',
//             'fullName',
//             'email',
//       ]);
//       const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    
//       const result = await contactService.getAllContacts(filters, options);

//       sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Get all contact successfully",
//         meta:result.meta,
//         data: result.data
//       })
//   });

// const getContactById = catchAsync(async(req, res) => {

//       const { contactId } = req.params;
  
//       const contact = await contactService.getContactById(contactId!);

//       sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Get single contact successfully",
//         data:contact
//       });
//   });

// const deleteContact = catchAsync(async(req, res) =>{
     
//     const { contactId } = req.params;

//     await contactService.deleteContact(contactId!);
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message:"Deleted contact successfully"
//     })
//   });

//   export const contactController = {
//     createContact,
//     getAllContacts,
//     getContactById,
//     deleteContact
//   }

