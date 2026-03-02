import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Index, // <-- Importante para o índice UNIQUE nos hashes
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { OrderEntity } from '../order/order.entity';
import { AddressEntity } from '../address/address.entity';
import { UserGenderEnum, UserStatusEnum } from './enums/user.enum';

import { Role } from 'src/modules/role/roles.decorator';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstName', length: 100, nullable: false })
  firstName: string;

  @Column({ name: 'lastName', length: 100, nullable: false })
  lastName: string;

  @Column({ name: 'role', type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Exclude()
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  // =========================================================
  // === DADOS SENSÍVEIS (AES-256 CRIPTOGRAFADO & HASH) ======
  // =========================================================

  // --- CPF ---
  cpf: string;

  @Column({
    name: 'encrypted_cpf',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  encryptedCpf: string; // Valor AES-256 (reversível)

  @Index({ unique: true })
  @Column({ name: 'cpf_hash', type: 'char', length: 64, nullable: true })
  cpfHash: string; // Hash SHA-256 (unicidade)

  // --- E-MAIL ---
  email: string;

  @Column({
    name: 'encrypted_email',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  encryptedEmail: string; // Valor AES-256 (reversível)

  @Index({ unique: true })
  @Column({ name: 'email_hash', type: 'char', length: 64, nullable: false })
  emailHash: string; // Hash SHA-256 (unicidade)

  phone: string;

  @Column({
    name: 'encrypted_phone',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  encryptedPhone: string; // Valor AES-256 (reversível)

  @Index({ unique: true })
  @Column({ name: 'phone_hash', type: 'char', length: 64, nullable: true })
  phoneHash: string; // Hash SHA-256 (unicidade)

  // --- DATA DE NASCIMENTO ---
  birthDate: string;

  @Column({
    name: 'encrypted_birthDate',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  encryptedBirthDate: string;

  gender: UserGenderEnum;

  @Column({
    name: 'encrypted_gender',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  encryptedGender: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.PENDING,
  })
  status: UserStatusEnum;

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
