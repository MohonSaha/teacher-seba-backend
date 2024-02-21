import { Types } from 'mongoose'

export type TGender = 'male' | 'female' | 'other'

export interface IUserName {
  firstName: string
  lastName: string
}

export interface IAdmin {
  id: string
  user: Types.ObjectId
  designation: string
  name: IUserName
  gender: TGender
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentLocation: string
  presentArea: string
  permanentLocation: string
  profileImage?: string
  managementDepartment: string
  isDeleted: boolean
}
