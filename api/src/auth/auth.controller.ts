import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import SignInDto from './dto/sign-in.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'common/decorators/public.decorator';
import { CurrentAccount } from 'common/decorators/current-account.decorator';
import ForgotPasswordDto from './dto/forgot-password.dto';
import AccountPayload from 'common/interfaces/account-payload/account.payload';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto.username, dto.password);
  }

  @Public()
  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @ApiBearerAuth()
  @Get('account-detailt')
  getProfile(@CurrentAccount() account: AccountPayload) {
    return account;
  }
}
