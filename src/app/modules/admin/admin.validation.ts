import { z } from 'zod'
import { Gender } from './admin.constant'

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  lastName: z.string().max(20).optional(),
})

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    email: z.string().email(),
    mobile: z.string(),
    designation: z.string().optional(),
    name: createUserNameValidationSchema.optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentLocation: z.string().optional(),
    presentArea: z.string().optional(),
    permanentLocation: z.string().optional(),
    managementDepartment: z.string().optional(),
    profileImage: z.string().optional(),
  }),
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  lastName: z.string().max(20).optional(),
})

export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      designation: z.string().optional(),
      name: updateUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentLocation: z.string().optional(),
      presentArea: z.string().optional(),
      permanentLocation: z.string().optional(),
      managementDepartment: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
})

export const AdminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
}
