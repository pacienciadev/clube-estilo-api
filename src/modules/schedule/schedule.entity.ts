import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'schedules' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'client', nullable: false })
  client: string;

  @Column({ name: 'provider', nullable: false })
  provider: string;

  @Column({ name: 'establishment', nullable: false })
  establishment: string;

  @Column({ name: 'services', type: 'json', nullable: false })
  services: string[];

  @Column({ name: 'priority', type: 'int', nullable: false })
  priority: number;

  @Column({ name: 'bill_value', type: 'decimal', nullable: false })
  bill_value: number;

  @Column({ name: 'accepted_in', type: 'timestamp', nullable: true })
  accepted_in: string;

  @Column({ name: 'check_in', type: 'timestamp', nullable: true })
  check_in: string;

  @Column({ name: 'check_out', type: 'timestamp', nullable: true })
  check_out: string;

  @Column({ name: 'devices_location', type: 'json', nullable: true })
  devices_location: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}