import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { EstablishmentCreateDTO } from './dto/establishment-create.dto';

import { EstablishmentService } from './establishment.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/establishments')
export class EstablishmentController {
  constructor(private establishmentService: EstablishmentService) {}

  @Get()
  async establishmentsList() {
    const savedEstablishments = await this.establishmentService.establishmentsList();

    return {
      message: 'Estabelecimentos obtidos com sucesso.',
      establishments: savedEstablishments,
    };
  }

  @Get('/:id')
  async establishmentDetails(@Param('id') id: string) {
    const establishments = await this.establishmentService.establishmentsList();

    return establishments.find((estab) => estab.id === id);
  }

  @Post()
  async establishmentCreate(@Body() establishmentData: EstablishmentCreateDTO) {
    await this.establishmentService.createEstablishment({
      ...establishmentData,
    });

    return {
      message: 'Estabelecimento criado com sucesso.',
    };
  }

  @Put('/:id')
  async updateEstablishment(
    @Param('id') id: string,
    @Body() establishmentData: EstablishmentCreateDTO,
  ) {
    await this.establishmentService.updateEstablishment(id, establishmentData);
    return {
      message: 'Estabelecimento atualizado com sucesso.',
    };
  }

  @Delete('/:id')
  async deleteEstablishment(@Param('id') id: string) {
    await this.establishmentService.deleteEstablishment(id);
    return {
      message: 'Estabelecimento deletado com sucesso.',
    };
  }
}