import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ScheduleEntity } from './schedule.entity';

import { Repository } from 'typeorm';

import { CreateScheduleDTO } from './dto/schedule-create.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async schedulesList() {
    const savedSchedules = await this.scheduleRepository.find();
    
    return savedSchedules;
  }

  async createSchedule(scheduleData: CreateScheduleDTO) {
    const scheduleEntity = new ScheduleEntity();

    Object.assign(scheduleEntity, scheduleData);

    return this.scheduleRepository.save(scheduleEntity);
  }

  updateSchedule(id: string, scheduleData: CreateScheduleDTO) {
    return this.scheduleRepository.update(id, scheduleData);
  }

  deleteSchedule(id: string) {
    return this.scheduleRepository.delete(id);
  }
}
