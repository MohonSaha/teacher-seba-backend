/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface IUser {
  id: string
  email: string
  password: string
  passwordChangeAt?: Date
  role: 'admin' | 'moderator' | 'teacher' | 'guardian' | 'superAdmin'
  status: 'in-progress' | 'blocked' | 'negligible '
  isVerified: boolean
  isDeleted: boolean
}

export interface UserModel extends Model<IUser> {
  isUserExistByEmail(name: string): Promise<IUser>
  isUserExistById(id: string): Promise<IUser>

  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>
}
