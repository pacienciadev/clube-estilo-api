import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AffiliationCategories } from './enum/affiliation-categorys.enum';

@Entity({ name: 'affiliations' })
export class AffiliationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'description', length: 60, nullable: false })
  description: AffiliationCategories;

  @Column({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.affiliations)
  user: UserEntity;
}
