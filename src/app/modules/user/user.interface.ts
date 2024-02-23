/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type TGender = 'male' | 'female' | 'other'

export interface IUserName {
  firstName: string
  lastName: string
}

export interface IUser {
  id: string
  email: string
  mobile: string
  password: string
  passwordChangeAt?: Date
  role: 'admin' | 'moderator' | 'teacher' | 'guardian' | 'superAdmin'
  status: 'in-progress' | 'blocked' | 'negligible'
  isVerified: boolean
  isDeleted: boolean
}

export interface UserModel extends Model<IUser> {
  isUserExistByEmail(name: string): Promise<IUser>
  isUserExistById(id: string): Promise<IUser>
  isUserDeleted(id: string): Promise<IUser>

  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>
}
