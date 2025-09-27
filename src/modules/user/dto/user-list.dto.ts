export class UserListDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly bornDate: Date,
    readonly gender: string,
    readonly addresses: any[],
    readonly affiliation: string,
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly deletedAt: string,
  ) {}
}
