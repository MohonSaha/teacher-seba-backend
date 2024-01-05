import { Schema, model } from 'mongoose';
import { IAdmin, IUserName } from './admin.interface';

const adminNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'first name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'last name can not be more than 20 characters'],
  },
});

const adminSchema = new Schema<IAdmin>({
  id: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  designation: {
    type: String,
    required: true,
  },
  name: {
    type: adminNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,

    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  presentLocation: {
    type: String,
    required: true,
  },
  presentArea: {
    type: String,
    required: true,
  },
  permanentLocation: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  managementDepartment: {
    type: String,
    required: true,
  },
});

export const Admin = model<IAdmin>('Admin', adminSchema);
