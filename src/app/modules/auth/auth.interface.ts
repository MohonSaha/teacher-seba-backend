import { USER_ROLE } from '../user/user.constant'

export type TLoginUser = {
  email: string
  password: string
}

export type TUserRole = keyof typeof USER_ROLE
