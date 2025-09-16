import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AffiliationService } from './affiliation.service';

import { CreateAffiliationDTO } from './dto/create-affiliation.dto';
import { AffiliationListDTO } from './dto/affiliations.dto';

import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('/affiliations')
export class AffiliationController {
  constructor(private affiliationService: AffiliationService) {}

  @Post()
  async createAffiliation(@Body() affiliationData: CreateAffiliationDTO) {
    const createdAffiliation =
      await this.affiliationService.createAffiliation(affiliationData);

    return {
      message: 'Filiação criada com sucesso.',
      affiliation: new AffiliationListDTO(
        createdAffiliation.id,
        createdAffiliation.description,
      ),
    };
  }

  @Get()
  async affiliationsList() {
    const savedAffiliations = await this.affiliationService.affiliationsList();

    return {
      message: 'Filiações obtidas com sucesso.',
      affiliations: savedAffiliations.map(
        (affiliation) =>
          new AffiliationListDTO(affiliation.id, affiliation.description),
      ),
    };
  }
}

//   @Get('/:id')
//   @UseGuards(AuthGuard)
//   async userDetails(@Param('id') id: string) {
//     const user = await this.userService.searchById(id);

//     return new UserListDTO(user.id, user.name);
//   }

//   @Put('/:id')
//   @UseGuards(AuthGuard)
//   async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
//     const updatedUser = await this.userService.updateUser(id, newData);

//     return {
//       message: 'Usuário atualizado com sucesso',
//       user: updatedUser,
//     };
//   }

//   @Delete('/:id')
//   @UseGuards(AuthGuard)
//   async removeUser(@Param('id') id: string) {
//     const removedUser = await this.userService.deleteUser(id);

//     return {
//       message: 'Usuário removido com sucesso',
//       user: removedUser,
//     };
//   }
// }
