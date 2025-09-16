import { UserEntity } from "src/modules/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'individual_addresses' })
export class IndividualAddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: UserEntity;
}