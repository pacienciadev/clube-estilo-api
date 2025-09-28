import { AddressEntity } from 'src/modules/address/address.entity';
import { UserAffiliationEnum } from '../enums/user.enum';

export class UserListDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly cpf: string,
    readonly birthDate: Date,
    readonly gender: string,
    readonly addresses: AddressEntity[],
    readonly affiliation: UserAffiliationEnum,
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly deletedAt: string,
  ) {}
}
