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
import { AffiliationEntity } from '../affiliation/affiliation.entity';
import { IndividualAddressEntity } from '../address/individual/individual-address.entity';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  // tipo_filiacao;
  @OneToMany(() => AffiliationEntity, (affiliation) => affiliation.user)
  affiliations: AffiliationEntity[];

  @OneToMany(() => IndividualAddressEntity, (address) => address.user)
  addresses: IndividualAddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
