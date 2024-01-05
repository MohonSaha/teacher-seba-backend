export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}
