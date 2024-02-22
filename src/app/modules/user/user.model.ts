import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'
import AppError from '../../error/appError'
import httpStatus from 'http-status'

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'teacher', 'guardian'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked', 'negligible'],
      default: 'in-progress',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // for createAt and updatedAt
  },
)

// Validation for duplicate email
userSchema.pre('save', async function (next) {
  const isEmailExist = await User.findOne({
    email: this.email,
  })
  if (isEmailExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This email is already exist')
  }
  next()
})

// It will hash the password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  // Hashing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

// pre save middleware hook to set empty string of the password field
userSchema.post('save', function (doc, next) {
  doc.password = '' // Empty the hashed password
  next()
})

export const User = model<IUser>('User', userSchema)
