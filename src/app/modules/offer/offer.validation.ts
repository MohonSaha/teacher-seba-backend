import { z } from 'zod'

const createOfferValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    district: z.string(),
    location: z.string(),
    area: z.string(),
    specificArea: z.string().optional(),
    class: z.string(),
    category: z.string(),
    subjects: z.array(z.string()).min(1),
    preferredTutor: z.enum(['male', 'female', 'both']),
    tutoringTime: z.string(),
    tutoringDays: z.string(),
    noOfStudent: z.string(),
    studentGender: z.enum(['male', 'female', 'other']).optional(),
    tuitionFee: z.number().positive(),
    otherRequirements: z.string().optional(),
    gaurdianNumber: z.string().optional(),
    publicStatus: z.enum(['available', 'booked']).default('available'),
    adminStatus: z
      .enum([
        'updating',
        'searching',
        'decision pending',
        'demo running',
        'confirm',
        'reject',
      ])
      .default('updating'),
    postedStatus: z.enum(['pending', 'approved', 'blocked']).default('pending'),
    isDeleted: z.boolean().default(false),
  }),
})

const updateOfferValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    district: z.string().optional(),
    location: z.string().optional(),
    area: z.string().optional(),
    specificArea: z.string().optional(),
    class: z.string().optional(),
    category: z.string().optional(),
    subjects: z.array(z.string()).min(1).optional(),
    preferredTutor: z.enum(['male', 'female', 'both']).optional(),
    tutoringTime: z.string().optional(),
    tutoringDays: z.string().optional(),
    noOfStudent: z.string().optional(),
    studentGender: z.enum(['male', 'female', 'other']).optional(),
    tuitionFee: z.number().positive().optional(),
    otherRequirements: z.string().optional(),
    gaurdianNumber: z.string().optional(),
    adminStatus: z
      .enum([
        'updating',
        'searching',
        'decision pending',
        'demo running',
        'confirm',
        'reject',
      ])
      .optional(),
    postedStatus: z.enum(['pending', 'approved', 'blocked']).optional(),
    publicStatus: z.enum(['available', 'booked']).optional(),
    isDeleted: z.boolean().optional(),
  }),
})

const changeAdminStatusValidationSchema = z.object({
  body: z.object({
    adminStatus: z.enum([
      'updating',
      'searching',
      'decision pending',
      'demo running',
      'confirm',
      'reject',
    ]),
  }),
})

const changePostedStatusValidationSchema = z.object({
  body: z.object({
    postedStatus: z.enum(['pending', 'approved', 'blocked']),
  }),
})

export const OfferValidation = {
  createOfferValidationSchema,
  updateOfferValidationSchema,
  changeAdminStatusValidationSchema,
  changePostedStatusValidationSchema,
}
