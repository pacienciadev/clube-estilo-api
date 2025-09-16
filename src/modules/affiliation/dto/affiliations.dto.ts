import { AffiliationCategories } from '../enum/affiliation-categorys.enum';

export class AffiliationListDTO {
  constructor(
    readonly id: string,
    readonly description: AffiliationCategories,
  ) {}
}
