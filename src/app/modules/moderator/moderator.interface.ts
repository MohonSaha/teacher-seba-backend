import { Types } from 'mongoose'
import { IUserName, TGender } from '../user/user.interface'

export interface IModerator {
  id: string
  user: Types.ObjectId
  email: string
  mobile: string
  password: string
  designation?: string
  name?: IUserName
  gender?: TGender
  dateOfBirth?: string
  contactNo?: string
  emergencyContactNo?: string
  presentLocation?: string
  presentArea?: string
  permanentLocation?: string
  profileImage?: string
  managementDepartment?: string
  isDeleted: boolean
}
