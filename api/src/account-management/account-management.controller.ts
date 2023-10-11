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
import { Roles } from 'common/decorators/role.decorator';
import { Role } from 'common/enums/role.enum';
import UpdatePasswordDto from './dto/update-password.dto';
import { UpdatePasswordByAccountIdDto } from './dto/update-password-by-id.dto';

@Public()
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
  // @Roles(Role.Admin)
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

  // @Post('lock-account/:id')
  // lockAccount(@Param('id') id: string) {
  //   // return this.accountManagementService.(id);
  // }

  @Get('/remove-all-account')
  removeAllAccount() {
    return this.accountManagementService.removeAllAccount();
  }
}
