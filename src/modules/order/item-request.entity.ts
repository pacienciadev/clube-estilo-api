import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'item_requests' })
export class ItemRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'sale_price', nullable: false })
  salePrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.itemRequests, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.itemRequests, {
    cascade: ['update'],
  })
  product: ProductEntity;
}
