import { Schema, model } from 'mongoose'
import { ITeacher } from './teacher.interface'
import { IUserName } from '../user/user.interface'

const teacherNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'first name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'last name can not be more than 20 characters'],
  },
})

const sscInformationSchema = new Schema({
  sscInstitute: String,
  sscCurriculum: String,
  sscGroup: String,
  sscPassingYear: String,
  sscResult: String,
})

const hscInformationSchema = new Schema({
  hscInstitute: String,
  hscCurriculum: String,
  hscGroup: String,
  hscPassingYear: String,
  hscResult: String,
})

const gradInformationSchema = new Schema({
  gradInstituteType: String,
  gradInstitute: String,
  gradStudyType: String,
  gradDepartments: String,
  gradPassingYear: String,
  gradCGPA: String,
})

const nationalCardSchema = new Schema({
  frontSide: String,
  backSide: String,
})

const tuitionExpectedSalarySchema = new Schema({
  lowSalary: String,
  highSalary: String,
})

const tuitionInfoSchema = new Schema({
  tuitionDistricts: String,
  tuitionAreas: [String],
  tuitionMedium: [String],
  tuitionClasses: [String],
  tuitionSubjects: [String],
  tuitionDaysPerWeek: [String],
  tuitionTimingShift: [String],
  tuitionExpectedSalary: tuitionExpectedSalarySchema,
  tuitionTutoringStyle: [String],
  tuitionExperience: String,
})

const applyStatusSchema = new Schema({
  totalAppliedTuition: [String],
  totalAssignedTuition: [String],
  totalConfirmedTuition: [String],
  totalCancelledTuition: [String],
})

const teacherSchema = new Schema<ITeacher>(
  {
    id: String,
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: String,
    isPremium: Boolean,
    name: teacherNameSchema,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    dateOfBirth: String,
    contactNo: String,
    emergencyContactNo: String,
    presentLocation: String,
    presentArea: String,
    permanentLocation: String,
    guardianContactNo: String,
    profileImage: String,
    managementDepartment: String,
    isDeleted: { type: Boolean, default: false },
    sscInformation: sscInformationSchema,
    hscInformation: hscInformationSchema,
    gradInformation: gradInformationSchema,
    nationalCard: nationalCardSchema,
    tuitionInfo: tuitionInfoSchema,
    applyStatus: applyStatusSchema,
  },
  {
    timestamps: true,
  },
)

export const Teacher = model<ITeacher>('Teacher', teacherSchema)
