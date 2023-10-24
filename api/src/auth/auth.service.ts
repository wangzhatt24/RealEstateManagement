import { HttpStatus, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AccountPayload from 'common/interfaces/account-payload/account.payload';
import { ResponseCommon } from 'common/interfaces/response-common/response.dto';
import { AccountManagementService } from 'src/account-management/account-management.service';
import * as bcrypt from 'bcrypt'
import { bcryptConfigs, jwtConstants } from 'configs/configs';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from 'schemas/account/account.schema';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => AccountManagementService)) private accountService: AccountManagementService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const findAccount = await this.accountService.findOneByIdOrUsername(username);

    if (findAccount.success === false) {
      return new ResponseCommon(
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        'INCORRECT_USERNAME_OR_PASSWORD',
      );
    }

    const account = findAccount.data;
    
    if(!await bcrypt.compare(pass, account?.password)) {
      throw new UnauthorizedException();
    }

    const payload: AccountPayload = {
      accountId: account.id,
      username: account.username,
      isAdmin: account.isAdmin,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findAccountAndSign(email: string): Promise<any> {
    // account này chứa tài liệu con như user và account state
    const findAccount = await this.accountService.findOneByEmail(email);

    const account = findAccount.data;

    const payload: AccountPayload = {
      accountId: account.id,
      username: account.username,
      isAdmin: account.isAdmin,
    };

    return {
      token: await this.jwtService.signAsync(payload),
      user: account.user
    };
  }

  async verifyToken(token: string): Promise<AccountPayload> {
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: AccountPayload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      return payload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async forgotPassword(email: string) {
    const {token, user} = await this.findAccountAndSign(email);

    const sendMail = await this.mailService.sendForgotPassword(user, token);

    return true
  }
}
