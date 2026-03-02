import { AddressEntity } from 'src/modules/address/address.entity';
import { UserStatusEnum } from '../enums/user.enum';
import { Role } from 'src/modules/role/roles.decorator';

export class UserListDTO {
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly phone: string,
    readonly cpf: string,
    readonly birthDate: string,
    readonly gender: string,
    readonly addresses: AddressEntity[],
    readonly status: UserStatusEnum,
    readonly role: Role,
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly deletedAt: string,
  ) {}
}
