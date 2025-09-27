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

  @Column({ name: 'phone', length: 15, nullable: true })
  phone: string;

  @Column({ name: 'bornDate', type: 'date', nullable: true })
  bornDate: Date;

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
    enum: [
      'USER',
      'CE_ADMIN',
      'SERVICE_PROVIDER',
      'SUPER_ADMIN',
      'SERVICE_PROVIDER_MANAGER',
    ],
    default: 'USER',
  })
  affiliation: string;

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
