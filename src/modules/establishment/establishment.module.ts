import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentEntity } from './establishment.entity';
import { EstablishmentService } from './establishment.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstablishmentEntity])],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
  exports: [EstablishmentService],
})
export class EstablishmentModule {}
