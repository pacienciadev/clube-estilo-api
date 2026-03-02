import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Role } from '../../modules/role/roles.decorator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  @Column()
  role: Role;
}
