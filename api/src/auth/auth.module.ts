import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountManagementModule } from 'src/account-management/account-management.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'configs/configs';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    forwardRef(() => AccountManagementModule),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    MailModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService
  ],
  exports: [AuthService]
})
export class AuthModule {}
