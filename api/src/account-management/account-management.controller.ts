import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { AccountManagementService } from './account-management.service';
import { CreateAccountManagementDto } from './dto/create-account-management.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'common/decorators/public.decorator';
import UpdatePasswordDto from './dto/update-password.dto';
import { UpdatePasswordByAccountIdDto } from './dto/update-password-by-id.dto';
import { lockAccountDto } from './dto/lock-account.dto';
import { CurrentAccount } from 'common/decorators/current-account.decorator';
import AccountPayload from 'common/interfaces/account-payload/account.payload';
import { UnlockAccountDto } from './dto/unlock-account.dto';
import { Roles } from 'common/decorators/role.decorator';
import { Role } from 'common/enums/role.enum';

@ApiBearerAuth()
@ApiTags('Account Management')
@Controller('account-management')
export class AccountManagementController {
  constructor(
    private accountManagementService: AccountManagementService,
  ) {
    this.seedAdmin()
  }

  seedAdmin() {
    return this.accountManagementService.createAdminAccount()
  }

  @Public()
  @Post('create-account')
  create(@Body() dto: CreateAccountManagementDto) {
    return this.accountManagementService.create(dto);
  }

  @Get('all-account')
  @Roles(Role.Admin)
  findAll() {
    return this.accountManagementService.findAll();
  }

  @Get('account/:idOrUsername')
  findOne(@Param('idOrUsername') idOrUsername: string) {
    return this.accountManagementService.findOneByIdOrUsername(idOrUsername);
  }

  @Patch('update-account/')
  update(@Body() dto: UpdatePasswordByAccountIdDto) {
    return this.accountManagementService.updatePasswordByAccountId(dto);
  }

  @Public()
  @Post('update-password-forgot')
  async updateForgotPassword(@Body() dto: UpdatePasswordDto) {
    return this.accountManagementService.updateForgotPasswordAccount(dto)
  }

  @Post('lock-account/')
  lockAccount(
    @Body() lockAccountDto: lockAccountDto,
    @CurrentAccount() currentAccount: AccountPayload
  ) {
    return this.accountManagementService.lockAccount(lockAccountDto, currentAccount);
  }

  @Post('unlock-account')
  unlockAccount(
    @Body() dto: UnlockAccountDto,
    @CurrentAccount() currentAccount: AccountPayload
  ) {
    return this.accountManagementService.unLockAccount(dto, currentAccount);
  }

  @Get('/remove-all-account')
  removeAllAccount() {
    return this.accountManagementService.removeAllAccount();
  }
}
