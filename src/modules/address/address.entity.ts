import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'description', length: 255, nullable: true })
  description: string;
  
  @Column({ name: 'street', length: 255, nullable: false })
  street: string;

  @Column({ name: 'number', length: 10, nullable: false })
  number: string;

  @Column({ name: 'complement', length: 255, nullable: true })
  complement: string;

  @Column({ name: 'city', length: 100, nullable: false })
  city: string;

  @Column({ name: 'state', length: 100, nullable: false })
  state: string;

  @Column({ name: 'zip_code', length: 10, nullable: false })
  zipCode: string;

  @Column({ name: 'country', length: 100, nullable: false })
  country: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.addresses)
  user: UserEntity;
}
