import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAffiliationDTO } from './dto/create-affiliation.dto';
import { AffiliationEntity } from './affiliation.entity';
import { AffiliationListDTO } from './dto/affiliations.dto';

@Injectable()
export class AffiliationService {
  constructor(
    @InjectRepository(AffiliationEntity)
    private readonly affiliationRepository: Repository<AffiliationEntity>,
  ) {}

  async createAffiliation(affiliationData: CreateAffiliationDTO) {
    const affiliationEntity = new AffiliationEntity();

    Object.assign(affiliationEntity, affiliationData);

    return this.affiliationRepository.save(affiliationEntity);
  }

  async affiliationsList(): Promise<AffiliationListDTO[]> {
    const affiliations = await this.affiliationRepository.find();

    const affiliationList: AffiliationListDTO[] = affiliations.map(
      (affiliation) =>
        new AffiliationListDTO(affiliation.id, affiliation.description),
    );

    return affiliationList;
  }
}
