import { User } from '../../users/entities/user.entity';

export class Auth {
  _id: string;
  email: string;
  password: string;
  role: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
