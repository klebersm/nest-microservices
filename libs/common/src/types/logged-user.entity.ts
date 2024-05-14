import { User } from './user.entity';

export type LoggedUser = {
  user: Pick<User, 'id' | 'name' | 'login' | 'email'>;
  token: String;
};
