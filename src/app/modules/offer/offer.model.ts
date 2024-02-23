import { Schema, model } from 'mongoose'
import { IOffer } from './offer.interface'

const offerSchema = new Schema<IOffer>({
  id: { type: String, required: true },
  publicStatus: {
    type: String,
    enum: ['available', 'booked'],
    default: 'available',
  },
  adminStatus: {
    type: String,
    enum: [
      'updating',
      'searching',
      'decision pending',
      'demo running',
      'confirm',
      'reject',
    ],
    default: 'updating',
  },
  postedStatus: {
    type: String,
    enum: ['pending', 'approved', 'blocked'],
    default: 'pending',
  },
  title: { type: String, required: true },
  district: { type: String, required: true },
  location: { type: String, required: true },
  area: { type: String, required: true },
  specificArea: { type: String },
  class: { type: String, required: true },
  category: { type: String, required: true },
  subjects: { type: [String], required: true },
  preferredTutor: {
    type: String,
    enum: ['male', 'female', 'both'],
    required: true,
  },
  tutoringTime: { type: String, required: true },
  tutoringDays: { type: String, required: true },
  noOfStudent: { type: String, required: true },
  studentGender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  tuitionFee: { type: Number, required: true },
  otherRequirements: { type: String },
  gaurdianNumber: { type: String },
  recommendedTeacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isDeleted: { type: Boolean, default: false },
})

export const Offer = model<IOffer>('Offer', offerSchema)
