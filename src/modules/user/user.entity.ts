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

import { Role } from 'src/modules/role/roles.decorator';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstName', length: 100, nullable: false })
  firstName: string;

  @Column({ name: 'lastName', length: 100, nullable: false })
  lastName: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Column({ name: 'role', nullable: false })
  role: Role;

  @Exclude()
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

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
