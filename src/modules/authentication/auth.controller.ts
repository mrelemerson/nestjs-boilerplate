import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JoiValidationPipe } from '../shared/pipes';

import { AuthService } from './auth.service';
import { ForgotPasswordDto, ResetPasswordDto } from './dto';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { ForgotPasswordSchema, ResetPasswordSchema } from './schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Req() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(
    @Body(new JoiValidationPipe(ForgotPasswordSchema))
    forgotPasswordDto: ForgotPasswordDto,
  ) {
    await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(
    @Body(new JoiValidationPipe(ResetPasswordSchema))
    resetPasswordDto: ResetPasswordDto,
  ) {
    await this.authService.resetPassword(resetPasswordDto);
  }
}
