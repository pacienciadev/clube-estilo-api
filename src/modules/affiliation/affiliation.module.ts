import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AffiliationService } from './affiliation.service';
import { UserEntity } from '../user/user.entity';
import { AffiliationEntity } from './affiliation.entity';
import { AffiliationController } from './affiliation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AffiliationEntity, UserEntity])],
  controllers: [AffiliationController],
  providers: [AffiliationService],
  exports: [AffiliationService],
})
export class AffiliationModule {}
