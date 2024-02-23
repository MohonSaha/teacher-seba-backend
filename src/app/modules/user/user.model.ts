import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'
import AppError from '../../error/appError'
import httpStatus from 'http-status'

const userSchema = new Schema<IUser, UserModel>(
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
    mobile: {
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

// Validation for duplicate mobile
userSchema.pre('save', async function (next) {
  const isMobileExist = await User.findOne({
    mobile: this.mobile,
  })
  if (isMobileExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This mobile number is already exist',
    )
  }
  next()
})

// Validation for valid mobile number lenght
userSchema.pre('save', async function (next) {
  const mobileNumber = this.mobile
  if (mobileNumber.length !== 11) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide a valid mobile number',
    )
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

// reuseable static mathods
// reuseable static method for ckecking user exist
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password')
}

// reuseable static method for ckecking if the user is deleted
userSchema.statics.isUserDeleted = async function (id: string) {
  const status = await User.findOne({ id })
  return status?.isDeleted
}

// Cheking if the password is matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword)
}

export const User = model<IUser, UserModel>('User', userSchema)
