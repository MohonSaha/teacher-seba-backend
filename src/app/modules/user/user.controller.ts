import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { UserService } from './user.service'

// Create admin account
const createAdmin = catchAsync(async (req, res) => {
  // const { password, admin: adminData } = req.body
  const result = await UserService.createAdminIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsersFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrived successfully',
    data: result,
  })
})

const getSingleUsers = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await UserService.getSingleUsersFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User retrived successfully',
    data: result,
  })
})

export const UserControllers = {
  createAdmin,
  getAllUsers,
  getSingleUsers,
}
