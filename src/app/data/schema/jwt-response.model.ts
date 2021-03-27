import {UserModel} from './user.model';

export class JwtResponseModel {
  token: string;
  type: string;
  user: UserModel;
}
