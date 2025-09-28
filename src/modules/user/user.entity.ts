import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { OrderEntity } from '../order/order.entity';
import { AddressEntity } from '../address/address.entity';
import { UserAffiliationEnum } from './enums/user.enum';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Exclude()
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @Column({ name: 'cpf', length: 11, nullable: true, unique: true })
  cpf: string;

  @Column({ name: 'phone', length: 15, nullable: true })
  phone: string;

  @Column({ name: 'birthDate', type: 'date', nullable: true })
  birthDate: Date;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: ['MALE', 'FEMALE', 'OTHER'],
    default: 'OTHER',
  })
  gender: string;

  @Column({
    name: 'affiliation',
    type: 'enum',
    enum: UserAffiliationEnum,
    default: UserAffiliationEnum.USER,
  })
  affiliation: UserAffiliationEnum;

  @OneToMany(() => AddressEntity, (address: AddressEntity) => address.user, {
    cascade: true,
  })
  addresses: AddressEntity[];

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.user)
  orders: OrderEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
