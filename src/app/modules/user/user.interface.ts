export interface IUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'moderator' | 'teacher' | 'guardian';
  status: 'in-progress' | 'blocked' | 'negligible ';
  isVerified: boolean;
  isDeleted: boolean;
}
