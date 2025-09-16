import { IsEnum } from 'class-validator';

import { AffiliationCategories } from '../enum/affiliation-categorys.enum';

export class CreateAffiliationDTO {
  @IsEnum(AffiliationCategories)
  category: AffiliationCategories;
}
