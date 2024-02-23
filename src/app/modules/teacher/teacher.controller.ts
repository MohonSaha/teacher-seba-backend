import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TeacherServices } from './teacher.service'

const updateTeacher = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await TeacherServices.updateTeacherIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher is updated succesfully',
    data: result,
  })
})

export const TeacherControllers = {
  updateTeacher,
}
