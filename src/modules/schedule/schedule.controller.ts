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

import { CreateScheduleDTO } from './dto/schedule-create.dto';

import { ScheduleService } from './schedule.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  async schedulesList() {
    const savedSchedules = await this.scheduleService.schedulesList();

    return {
      message: 'Agendamentos obtidos com sucesso.',
      schedules: savedSchedules,
    };
  }

  @Get('/:id')
  async scheduleDetails(@Param('id') id: string) {
    const schedule = await this.scheduleService.schedulesList();

    return schedule.find((sched) => sched.id === id);
  }
  
  @Post()
  async scheduleCreate(@Body() scheduleData: CreateScheduleDTO) {
    const createdSchedule = await this.scheduleService.createSchedule({
      ...scheduleData,
    });

    console.log("Agendamento criado:", createdSchedule);
    
    return {
      message: 'Agendamento criado com sucesso.',
    };
  }

  @Put('/:id')
  async updateSchedule(
    @Param('id') id: string,
    @Body() scheduleData: CreateScheduleDTO,
  ) {
    await this.scheduleService.updateSchedule(id, scheduleData);
    return {
      message: 'Agendamento atualizado com sucesso.',
    };
  }

  @Delete('/:id')
  async deleteSchedule(@Param('id') id: string) {
    await this.scheduleService.deleteSchedule(id);
    return {
      message: 'Agendamento deletado com sucesso.',
    };
  }
}