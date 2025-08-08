import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { ProductImageEntity } from './product-image.entity';
import { ProductFeatureEntity } from './product-feature.entity';
import { ItemRequestEntity } from '../order/item-request.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'available_quantity', nullable: false })
  availableQuantity: number;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'category', length: 100, nullable: false })
  category: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(
    () => ProductImageEntity,
    (productImageEntity) => productImageEntity.product,
    { cascade: true, eager: true },
  )
  images: ProductImageEntity[];

  @OneToMany(
    () => ProductFeatureEntity,
    (productFeatureEntity) => productFeatureEntity.product,
    { cascade: true, eager: true },
  )
  features: ProductFeatureEntity[];

  @OneToMany(() => ItemRequestEntity, (itemRequest) => itemRequest.product)
  itemRequests: ItemRequestEntity[];
}
