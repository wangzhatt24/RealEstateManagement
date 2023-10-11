import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { AccountManagementService } from './account-management.service';
import { CreateAccountManagementDto } from './dto/create-account-management.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'common/decorators/public.decorator';
import { Roles } from 'common/decorators/role.decorator';
import { Role } from 'common/enums/role.enum';
import { UpdateAccountManagementDto } from './dto/update-account-management.dto';

// @Public()
@ApiBearerAuth()
@ApiTags('Account Management')
@Controller('account-management')
export class AccountManagementController {
  constructor(
    private readonly accountManagementService: AccountManagementService,
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

  // @Patch('update-account/:id')
  // update(@Param('id') id: string, @Body() dto: UpdateAccountManagementDto) {
  //   return this.accountManagementService.updateAccountById(id, dto);
  // }

  // @Post('lock-account/:id')
  // lockAccount(@Param('id') id: string) {
  //   // return this.accountManagementService.(id);
  // }

  @Get('/remove-all-account')
  removeAllAccount() {
    return this.accountManagementService.removeAllAccount();
  }
}
