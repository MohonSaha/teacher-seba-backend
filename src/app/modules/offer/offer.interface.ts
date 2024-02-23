import { Types } from 'mongoose'
import { TGender } from '../user/user.interface'

export type TAdminStatus =
  | 'updating'
  | 'searching'
  | 'decision pending'
  | 'demo running'
  | 'confirm'
  | 'reject'

export type TPostedStatus = 'pending' | 'approved' | 'blocked'

export type TPublicStatus = 'available' | 'booked'

export interface IOffer {
  id: string
  publicStatus: TPublicStatus
  adminStatus: TAdminStatus
  postedStatus: TPostedStatus
  title: string
  district: string
  location: string
  area: string
  specificArea?: string
  class: string
  category: string
  subjects: string[]
  preferredTutor?: 'male' | 'female' | 'both'
  tutoringTime: string
  tutoringDays: string
  noOfStudent: string
  studentGender?: TGender
  tuitionFee: number
  otherRequirements?: string
  gaurdianNumber?: string
  recommendedTeacher: Types.ObjectId
  postedBy: Types.ObjectId
  isDeleted: boolean
}
