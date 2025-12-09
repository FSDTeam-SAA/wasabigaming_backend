// ==================== contact.service.ts ====================
import Contact from './contact.model';
import { IContact } from './contact.interface';
import AppError from '../../error/appError';
import pagination, { IOption } from '../../helper/pagenation';



const createContact = async(contactData: IContact) =>{

    const contact = await Contact.create(contactData);

    return contact;
}

const getAllContacts = async(params: any, options: IOption) => {

    const { page, limit, skip, sortBy, sortOrder } = pagination(options);
    const { searchTerm, year, ...filterData } = params;

    const andCondition: any[] = [];
    const userSearchableFields = [
        'fullname',
        'email'
   ];
   if (searchTerm) {
        andCondition.push({
        $or: userSearchableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        })),
        });
    }

    if (Object.keys(filterData).length) {
        andCondition.push({
        $and: Object.entries(filterData).map(([field, value]) => ({
            [field]: value,
        })),
        });
    }

    // YEAR Filter → createdAt
    if (year) {
        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

        andCondition.push({
        createdAt: {
            $gte: startDate,
            $lte: endDate,
        },
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

    const result = await Contact.find(whereCondition)
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder } as any);

    if (!result) {
        throw new AppError(404, 'Course not found');
    }

    const total = await Contact.countDocuments(whereCondition);

    return {
         meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
  }

const getContactById = async(id: string) => {

    const contact = await Contact.findById(id);

    if (!contact) {
      throw new AppError(404, 'Contact not found');
    }

    return contact;
  }

const deleteContact = async(id: string) => {

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      throw new AppError(404, 'Contact not found');
    }

    return contact;

}

export const contactService = {
   createContact,
   getAllContacts,
   getContactById ,
   deleteContact
};