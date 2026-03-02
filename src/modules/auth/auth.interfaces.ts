import { Request } from 'express';
import { AddressEntity } from '../address/address.entity';

import { Role } from 'src/modules/role/roles.decorator';
import { OrderEntity } from '../order/order.entity';
import { UserStatusEnum } from '../user/enums/user.enum';

export interface UserRequest extends Request {
  user: UserPayload;
}

export interface UserPayload {
  sub: string;
  userName: string;
  addresses: AddressEntity[];
  role: Role;
  orders: OrderEntity[];
  status: UserStatusEnum;
  updatedAt: string;
}
