import { SetMetadata } from '@nestjs/common';
import { UserAffiliationEnum } from 'src/modules/user/enums/user.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserAffiliationEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
