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

    const bcryptSaltRounds =
      this.configService.get<string>('BCRYPT_SALT_ROUNDS');

    const saltRounds = Number(bcryptSaltRounds);

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }
}
