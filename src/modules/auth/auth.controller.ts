import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserRequest } from './auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: AuthDTO) {
    return this.authService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  @HttpCode(HttpStatus.OK)
  checkToken(@Req() req: UserRequest) {
    return {
      user: req.user,
      valid: true,
    };
  }
}
