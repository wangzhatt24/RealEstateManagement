import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountManagementService } from './account-management.service';
import { CreateAccountManagementDto } from './dto/create-account-management.dto';
import { UpdateAccountManagementDto } from './dto/update-account-management.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Account Management")
@Controller('account-management')
export class AccountManagementController {
  constructor(private readonly accountManagementService: AccountManagementService) {}

  @Post()
  create(@Body() createAccountManagementDto: CreateAccountManagementDto) {
    return this.accountManagementService.create(createAccountManagementDto);
  }

  @Get()
  findAll() {
    return this.accountManagementService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.accountManagementService.findOneById(+id);
  // }

  // @Get(':username')
  // findOneByUserName(@Param('username') username: string) {
  //   return this.accountManagementService.findOneByUserName(username);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountManagementDto: UpdateAccountManagementDto) {
  //   return this.accountManagementService.updateAccountById(+id, updateAccountManagementDto);
  // }

  @Patch(':username')
  updateAccountByUserName(@Param('username') username: string, @Body() UpdateAccountManagementDto: UpdateAccountManagementDto) {
    return this.accountManagementService.updateAccountByUserName(username, UpdateAccountManagementDto)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accountManagementService.remove(+id);
  // }

  @Get('/remove-all-account')
  removeAllAccount() {
    return this.accountManagementService.removeAllAccount()
  }
}
