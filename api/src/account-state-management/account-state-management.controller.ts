import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountStateManagementService } from './account-state-management.service';
import { CreateAccountStateManagementDto } from './dto/create-account-state-management.dto';
import { UpdateAccountStateManagementDto } from './dto/update-account-state-management.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags("Account State Management")
@Controller('account-state-management')
export class AccountStateManagementController {
  constructor(private readonly accountStateManagementService: AccountStateManagementService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  create(@Body() dto: CreateAccountStateManagementDto) {
    return this.accountStateManagementService.create(dto);
  }

  @Get()
  findAll() {
    return this.accountStateManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountStateManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountStateManagementDto: UpdateAccountStateManagementDto) {
    return this.accountStateManagementService.update(+id, updateAccountStateManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountStateManagementService.remove(+id);
  }
}
