import { Types } from 'mongoose'
import { IUserName, TGender } from '../user/user.interface'

export interface ISscInformation {
  sscInstitute: string
  sscCurriculum: string
  sscGroup: string
  sscPassingYear: string
  sscResult: string
}

export interface IHscInformation {
  hscInstitute: string
  hscCurriculum: string
  hscGroup: string
  hscPassingYear: string
  hscResult: string
}

export interface IGradInformationn {
  gradInstituteType: string
  gradInstitute: string
  gradStudyType: string
  gradDepartments: string
  gradPassingYear: string
  gradCGPA: string
}

export interface INationalCard {
  frontSide: string
  backSide: string
}

export interface ITuitionExpectedSalary {
  lowSalary: string
  highSalary: string
}

export interface ITuitionInfo {
  tuitionDistricts: string
  tuitionAreas: string[]
  tuitionMedium: string[]
  tuitionClasses: string[]
  tuitionSubjects: string[]
  tuitionDaysPerWeek: string[]
  tuitionTimingShift: string[]
  tuitionExpectedSalary: ITuitionExpectedSalary
  tuitionTutoringStyle: string[]
  tuitionExperience: string
}

export interface IApplyStatus {
  totalAppliedTuition: string[]
  totalAssignedTuition: string[]
  totalConfirmedTuiton: string[]
  totalCancelledTuition: string[]
}

export interface ITeacher {
  id: string
  user: Types.ObjectId
  isPremium?: boolean
  email: string
  mobile: string
  password: string
  designation?: string
  name?: IUserName
  gender?: TGender
  dateOfBirth?: string
  contactNo?: string
  emergencyContactNo?: string
  presentLocation?: string
  presentArea?: string
  permanentLocation?: string
  guardianContactNo?: string
  profileImage?: string
  managementDepartment?: string
  isDeleted: boolean
  sscInformation?: ISscInformation
  hscInformation?: IHscInformation
  gradInformation?: IGradInformationn
  nationalCard?: INationalCard
  tuitionInfo?: ITuitionInfo
  applyStatus?: IApplyStatus
}
