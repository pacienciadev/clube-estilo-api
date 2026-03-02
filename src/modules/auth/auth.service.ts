import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';

import { UserPayload } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.searchByEmailHash(email);

    if (!user) {
      throw new UnauthorizedException('O email ou a senha está incorreto.');
    }

    const userWasAuthenticated = await bcrypt.compare(password, user.password);

    if (!userWasAuthenticated) {
      throw new UnauthorizedException('O email ou a senha está incorreto.');
    }

    const payload: UserPayload = {
      sub: user.id, // sub === subject = id
      userName: `${user.firstName} ${user.lastName}`,
      addresses: user.addresses,
      orders: user.orders,
      updatedAt: user.updatedAt,
      status: user.status,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
