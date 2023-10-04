import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AccountPayload from 'common/interfaces/account-payload/account.payload';
import { ResponseCommon } from 'common/interfaces/response-common/response.dto';
import { AccountManagementService } from 'src/account-management/account-management.service';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountManagementService,
    private jwtService: JwtService
  ) { }

  async signIn(username: string, pass: string): Promise<any> {
    const findAccount = await this.accountService.findOneByUserName(username)

    if(findAccount.success === false) {
      return new ResponseCommon(
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        "INCORRECT_USERNAME_OR_PASSWORD",
      )
    }

    const account = findAccount.data

    if (account?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload: AccountPayload = {
      accountId: account.id,
      username: account.username,
      isAdmin: account.isAdmin
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}