import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(password: string) {
    if (!password) {
      throw new Error('Password is required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const salt = this.configService.get<string>('SALT_PASSWORD');

    const hashedPassword = await bcrypt.hash(password, salt!);

    return hashedPassword;
  }
}
