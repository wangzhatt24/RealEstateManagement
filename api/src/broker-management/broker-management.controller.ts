import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BrokerManagementService } from './broker-management.service';
import { CreateBrokerManagementDto } from './dto/create-broker-management.dto';
import { UpdateBrokerManagementDto } from './dto/update-broker-management.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AllRealEstateEnum, RentalRealEstateEnum, SaleRealEstateEnum } from 'common/enums/real-estate-type.enum';
import { Public } from 'common/decorators/public.decorator';
import { CurrentAccount } from 'common/decorators/current-account.decorator';
import AccountPayload from 'common/interfaces/account-payload/account.payload';

@ApiTags('Broker Management')
@ApiBearerAuth()
@Controller('broker-management')
export class BrokerManagementController {
  constructor(private readonly brokerManagementService: BrokerManagementService) {}

  @Post()
  // @ApiQuery({ name: 'RealEstateType', enum: AllRealEstateEnum })
  create(@Body() dto: CreateBrokerManagementDto) {
    return this.brokerManagementService.create(dto);
  }

  @Get()
  findAll() {
    return this.brokerManagementService.findAll();
  }

  @Get('/broker/:id')
  findOne(@Param('id') id: string) {
    return this.brokerManagementService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentAccount() currentAccount: AccountPayload) {
    return this.brokerManagementService.remove(id, currentAccount);
  }

  @Get('remove-all')
  removeAllBroker() {
    return this.brokerManagementService.removeAllBroker();
  }
}
