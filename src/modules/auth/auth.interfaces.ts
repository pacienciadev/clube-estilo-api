import { Request } from 'express';
import { UserEntity } from '../user/user.entity';
import { AddressEntity } from '../address/address.entity';
import { UserAffiliationEnum } from '../user/enums/user.enum';

export interface UserRequest extends Request {
  user: UserPayload & Pick<UserEntity, 'affiliation'>;
}

export interface UserPayload {
  sub: string;
  userName: string;
  affiliation: UserAffiliationEnum;
  addresses: AddressEntity[];
  orders: string[];
  updatedAt: Date;
}
