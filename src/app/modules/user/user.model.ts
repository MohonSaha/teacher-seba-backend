import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
});

export const User = model<IUser>('User', userSchema);
