import { Request } from 'express';

import { Role } from 'src/modules/role/roles.decorator';

export interface UserRequest extends Request {
  user: UserPayload;
}

export interface UserPayload {
  sub: string;
  userName: string;
  role: Role;
}
