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
  establishmentName: string;

  @Column({ name: 'establishment_email', nullable: false })
  establishmentEmail: string;

  @Column({ name: 'establishment_address', nullable: false })
  establishmentAddress: string;

  @Column({ name: 'establishment_document', nullable: false })
  establishmentDocument: string;

  @Column({ name: 'membership_type', nullable: false })
  membershipType: string;

  @Column({ name: 'monthly_fee', type: 'decimal', nullable: false })
  monthlyFee: number;

  @Column({ name: 'establishment_description', nullable: false })
  establishmentDescription: string;

  @Column({ name: 'establishment_services', type: 'simple-array', nullable: false })
  establishmentServices: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}