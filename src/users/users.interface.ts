import { Schema } from 'mongoose';
import { IAuth } from '../auth/auth.interface';

export interface IUser extends IAuth {
  name: string;
  address?: string;
  phone: string;
  password: string;
  profileImg?: string;
  dob?: string | Schema.Types.Date;
  _id?: string;
  role?: Array<'ADMIN' | 'SUPER_ADMIN' | 'USER'>;
}
