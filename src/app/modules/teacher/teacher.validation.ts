import { z } from 'zod'
import { Gender } from '../../constants/usersConstant'

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  lastName: z.string().max(20).optional(),
})

const createSSCInformationSchema = z.object({
  sscInstitute: z.string(),
  sscCurriculum: z.string(),
  sscGroup: z.string(),
  sscPassingYear: z.string(),
  sscResult: z.string(),
})

const createHSCInformationSchema = z.object({
  hscInstitute: z.string(),
  hscCurriculum: z.string(),
  hscGroup: z.string(),
  hscPassingYear: z.string(),
  hscResult: z.string(),
})

const createGradInformationSchema = z.object({
  gradInstituteType: z.string(),
  gradInstitute: z.string(),
  gradStudyType: z.string(),
  gradDepartments: z.string(),
  gradPassingYear: z.string(),
  gradCGPA: z.string(),
})

const createNationalCardSchema = z.object({
  frontSide: z.string(),
  backSide: z.string(),
})

const createTuitionExpectedSalarySchema = z.object({
  lowSalary: z.string(),
  highSalary: z.string(),
})

const createTuitionInfoSchema = z.object({
  tuitionDistricts: z.string(),
  tuitionAreas: z.array(z.string()),
  tuitionMedium: z.array(z.string()),
  tuitionClasses: z.array(z.string()),
  tuitionSubjects: z.array(z.string()),
  tuitionDaysPerWeek: z.array(z.string()),
  tuitionTimingShift: z.array(z.string()),
  tuitionExpectedSalary: createTuitionExpectedSalarySchema,
  tuitionTutoringStyle: z.array(z.string()),
  tuitionExperience: z.string(),
})

const createApplyStatusSchema = z.object({
  totalAppliedTuition: z.array(z.string()),
  totalAssignedTuition: z.array(z.string()),
  totalConfirmedTuition: z.array(z.string()),
  totalCancelledTuition: z.array(z.string()),
})

export const createTeacherValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    email: z.string().email(),
    mobile: z.string(),
    designation: z.string().optional(),
    isPremium: z.boolean().optional(),
    name: createUserNameValidationSchema.optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentLocation: z.string().optional(),
    presentArea: z.string().optional(),
    permanentLocation: z.string().optional(),
    guardianContactNo: z.string().optional(),
    profileImage: z.string().optional(),
    managementDepartment: z.string().optional(),
    isDeleted: z.boolean().optional(),
    sscInformation: createSSCInformationSchema.optional(),
    hscInformation: createHSCInformationSchema.optional(),
    gradInformation: createGradInformationSchema.optional(),
    nationalCard: createNationalCardSchema.optional(),
    tuitionInfo: createTuitionInfoSchema.optional(),
    applyStatus: createApplyStatusSchema.optional(),
  }),
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  lastName: z.string().max(20).optional(),
})

export const updateTeacherValidationSchema = z.object({
  body: z.object({
    teacher: z.object({
      designation: z.string().optional(),
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentLocation: z.string().optional(),
      presentArea: z.string().optional(),
      permanentLocation: z.string().optional(),
      guardianContactNo: z.string().optional(),
      profileImage: z.string().optional(),
      managementDepartment: z.string().optional(),
      isDeleted: z.boolean().optional(),
      sscInformation: createSSCInformationSchema.optional(),
      hscInformation: createHSCInformationSchema.optional(),
      gradInformation: createGradInformationSchema.optional(),
      nationalCard: createNationalCardSchema.optional(),
      tuitionInfo: createTuitionInfoSchema.optional(),
      applyStatus: createApplyStatusSchema.optional(),
    }),
  }),
})

export const TeacherValidation = {
  createTeacherValidationSchema,
  updateTeacherValidationSchema,
}
