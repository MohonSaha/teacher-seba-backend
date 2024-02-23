import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
// import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
// import bcrypt from 'bcrypt'
import { createToken } from './auth.utils'
import AppError from '../../error/appError'

const loginUser = async (payload: TLoginUser) => {
  // Checking if the user is exist
  const user = await User.isUserExistByEmail(payload?.email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  }

  // checking if the user is already deleted
  if (await User.isUserDeleted(payload?.email)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
  }

  // checking if the user is blcoked
  const userStatus = user?.status
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }

  // checking if the user is negligible
  if (userStatus === 'negligible') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is negligible')
  }

  // Checking if the password is matched
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!!')
  }

  // create token and sent to the client
  const jwtPayload = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userId: (user as any)._id,
    email: user.email,
    role: user?.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  // create refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

// const chnagePassword = async (
//   userData: JwtPayload,
//   payload: { oldPassword: string; newPassword: string },
// ) => {
//   // Checking if the user is exist
//   const user = await User.isUserExistByCustomId(userData.userId)
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
//   }

//   // checking if the user is already deleted
//   if (await User.isUserDeleted(userData.userId)) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
//   }

//   // checking if the user is blcoked
//   const userStatus = user?.status
//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
//   }

//   // Check if the password is matched
//   if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
//     throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!!')
//   }

//   // hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload?.newPassword,
//     Number(config.bcrypt_salt_round),
//   )

//   await User.findOneAndUpdate(
//     {
//       id: userData.userId,
//       role: userData.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangeAt: new Date(),
//     },
//   )

//   return null
// }

// const refreshToken = async (token: string) => {
//   // checking if the given token is valid
//   const decoded = jwt.verify(
//     token,
//     config.jwt_refresh_secret as string,
//   ) as JwtPayload

//   const { userId, iat } = decoded

//   // checking if the user is exist
//   const user = await User.isUserExistByCustomId(userId)

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
//   }

//   // checking if the user is blocked
//   const userStatus = user?.status

//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
//   }

//   if (
//     user.passwordChangeAt &&
//     User.isJWTIssuedBefforePasswordChange(user.passwordChangeAt, iat as number)
//   ) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
//   }

//   const jwtPayload = {
//     userId: user.id,
//     role: user.role,
//   }

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   )

//   return {
//     accessToken,
//   }
// }

// const forgetPassword = async (userId: string) => {
//   // checking if the user is exist
//   const user = await User.isUserExistByCustomId(userId)

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
//   }

//   // checking if the user is blocked
//   const userStatus = user?.status

//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
//   }

//   // create token and sent to the client
//   const jwtPayload = {
//     userId: user.id,
//     role: user?.role,
//   }

//   const resetToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     '2d',
//   )

//   const resetUILink = `${config.reset_password_ui_link}?id=${user?.id}&token=${resetToken}`

//   sendEmail(user.email, resetUILink)
// }

// password reser mechanism
// const resetPassword = async (
//   payload: { id: string; newPassword: string },
//   token: string,
// ) => {
//   // checking if the user is exist
//   const user = await User.isUserExistByCustomId(payload?.id)

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
//   }

//   // checking if the user is blocked
//   const userStatus = user?.status

//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
//   }

//   // checking if the given token is valid
//   const decoded = jwt.verify(
//     token,
//     config.jwt_access_secret as string,
//   ) as JwtPayload

//   if (payload.id !== decoded.userId) {
//     throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!!')
//   }

//   // hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload?.newPassword,
//     Number(config.bcrypt_salt_round),
//   )

//   await User.findOneAndUpdate(
//     {
//       id: decoded.userId,
//       role: decoded.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangeAt: new Date(),
//     },
//   )
// }

export const AuthServices = {
  loginUser,
  //   chnagePassword,
  //   refreshToken,
  //   forgetPassword,
  //   resetPassword,
}
