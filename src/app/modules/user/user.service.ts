import mongoose from 'mongoose';
import config from '../../config';
import { IAdmin } from '../admin/admin.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId } from './user.utils';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Admin } from '../admin/admin.model';

const createAdminIntoDB = async (password: string, payload: IAdmin) => {
  // create a user object
  const userData: Partial<IUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set admin role
  userData.role = 'admin';
  // set admin email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUsersFromDB = async (_id: string) => {
  const result = await User.find({ _id });
  return result;
};

export const UserService = {
  createAdminIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
};
