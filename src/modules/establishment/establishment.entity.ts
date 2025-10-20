import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'establishments' })
export class EstablishmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'establishment_name', nullable: false })
  establishment_name: string;

  @Column({ name: 'establishment_email', nullable: false })
  establishment_email: string;

  @Column({ name: 'establishment_address', nullable: false })
  establishment_address: string;

  @Column({ name: 'establishment_document', nullable: false })
  establishment_document: string;

  @Column({ name: 'membership_type', nullable: false })
  membership_type: string;

  @Column({ name: 'monthly_fee', type: 'decimal', nullable: false })
  monthly_fee: number;

  @Column({ name: 'establishment_description', nullable: false })
  establishment_description: string;

  @Column({ name: 'establishment_services', type: 'simple-array', nullable: false })
  establishment_services: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}