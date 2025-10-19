import { AddressEntity } from 'src/modules/address/address.entity';
import { UserAffiliationEnum, UserStatusEnum } from '../enums/user.enum';

export class UserListDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly cpf: string,
    readonly birthDate: string,
    readonly gender: string,
    readonly addresses: AddressEntity[],
    readonly affiliation: UserAffiliationEnum,
    readonly status: UserStatusEnum,
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly deletedAt: string,
  ) {}
}
