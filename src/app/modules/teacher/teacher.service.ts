import httpStatus from 'http-status'
import AppError from '../../error/appError'
import { Teacher } from './teacher.model'
import { ITeacher } from './teacher.interface'

// update teacher
const updateTeacherIntoDB = async (id: string, payload: Partial<ITeacher>) => {
  const {
    name,
    sscInformation,
    hscInformation,
    gradInformation,
    nationalCard,
    tuitionInfo,
    applyStatus,
    ...restTeacherData
  } = payload
  const modifiedUpdatedData: Record<string, unknown> = {
    ...restTeacherData,
  }

  // non-primitive data
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  if (sscInformation && Object.keys(sscInformation).length) {
    for (const [key, value] of Object.entries(sscInformation)) {
      modifiedUpdatedData[`sscInformation.${key}`] = value
    }
  }
  if (hscInformation && Object.keys(hscInformation).length) {
    for (const [key, value] of Object.entries(hscInformation)) {
      modifiedUpdatedData[`hscInformation.${key}`] = value
    }
  }
  if (gradInformation && Object.keys(gradInformation).length) {
    for (const [key, value] of Object.entries(gradInformation)) {
      modifiedUpdatedData[`gradInformation.${key}`] = value
    }
  }
  if (nationalCard && Object.keys(nationalCard).length) {
    for (const [key, value] of Object.entries(nationalCard)) {
      modifiedUpdatedData[`nationalCard.${key}`] = value
    }
  }
  if (tuitionInfo && Object.keys(tuitionInfo).length) {
    for (const [key, value] of Object.entries(tuitionInfo)) {
      modifiedUpdatedData[`tuitionInfo.${key}`] = value
    }
  }
  if (applyStatus && Object.keys(applyStatus).length) {
    for (const [key, value] of Object.entries(applyStatus)) {
      modifiedUpdatedData[`applyStatus.${key}`] = value
    }
  }

  try {
    // update primitive and non-primitive data
    const updateCOurseData = await Teacher.findByIdAndUpdate(
      id,
      modifiedUpdatedData,
      {
        new: true,
        runValidators: true,
      },
    )

    if (!updateCOurseData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update teacher!')
    }

    const result = await Teacher.findById(id)
    return result
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Teacher!')
  }
}

export const TeacherServices = {
  updateTeacherIntoDB,
}
