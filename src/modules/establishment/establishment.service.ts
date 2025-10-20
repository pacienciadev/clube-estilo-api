import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EstablishmentEntity } from './establishment.entity';

import { Repository } from 'typeorm';

import { EstablishmentCreateDTO } from './dto/establishment-create.dto';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(EstablishmentEntity)
    private readonly establishmentRepository: Repository<EstablishmentEntity>,
  ) {}

  async establishmentsList() {
    const savedEstablishments = await this.establishmentRepository.find();

    return savedEstablishments;
  }

  async createEstablishment(establishmentData: EstablishmentCreateDTO) {
    const establishmentEntity = new EstablishmentEntity();

    Object.assign(establishmentEntity, establishmentData);

    return this.establishmentRepository.save(establishmentEntity);
  }

  updateEstablishment(id: string, establishmentData: EstablishmentCreateDTO) {
    return this.establishmentRepository.update(id, establishmentData);
  }

  deleteEstablishment(id: string) {
    return this.establishmentRepository.delete(id);
  }
}
