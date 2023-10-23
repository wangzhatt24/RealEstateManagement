import { Controller, Get, Post, Body, Patch, Param, Delete, Sse } from '@nestjs/common';
import { NotificationManangementService } from './notification-manangement.service';
import { CreateNotificationManangementDto } from './dto/create-notification-manangement.dto';
import { UpdateNotificationManangementDto } from './dto/update-notification-manangement.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentAccount } from 'common/decorators/current-account.decorator';
import AccountPayload from 'common/interfaces/account-payload/account.payload';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, interval, map } from 'rxjs';
import { NotificationDocument } from 'schemas/notification/notification.schema';
import { Server } from 'http';

@ApiTags("Notification Management")
@ApiBearerAuth()
@Controller('notification-manangement')
export class NotificationManangementController {
  constructor(
    private readonly notificationManangementService: NotificationManangementService,
  ) { }

  @Post('/new-notification')
  create(@Body() dto: CreateNotificationManangementDto) {
    return this.notificationManangementService.create(dto);
  }

  @Get('/all-notification')
  findAll(@CurrentAccount() currentAccount: AccountPayload) {
    return this.notificationManangementService.findAll(currentAccount);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationManangementService.findOne(id);
  }

  @Patch('update-state')
  update(
    @Body() dto: UpdateNotificationManangementDto,
    @CurrentAccount() currentAccount: AccountPayload
  ) {
    return this.notificationManangementService.updateState(dto, currentAccount);
  }
}
