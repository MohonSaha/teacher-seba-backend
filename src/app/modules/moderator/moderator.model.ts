import { Schema, model } from 'mongoose'
import { IUserName } from '../user/user.interface'
import { IModerator } from './moderator.interface'

const moderatorNameSchema = new Schema<IUserName>({
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
})

const moderatorSchema = new Schema<IModerator>({
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
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
  designation: {
    type: String,
  },
  name: {
    type: moderatorNameSchema,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  dateOfBirth: {
    type: String,
  },
  contactNo: {
    type: String,
  },
  emergencyContactNo: {
    type: String,
  },
  presentLocation: {
    type: String,
  },
  presentArea: {
    type: String,
  },
  permanentLocation: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  managementDepartment: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

export const Moderator = model<IModerator>('Moderator', moderatorSchema)
