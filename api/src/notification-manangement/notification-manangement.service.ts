import { HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateNotificationManangementDto } from './dto/create-notification-manangement.dto';
import { UpdateNotificationManangementDto } from './dto/update-notification-manangement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from 'schemas/notification/notification.schema';
import { Model } from 'mongoose';
import { UserManagementService } from 'src/user-management/user-management.service';
import { ResponseCommon } from 'common/interfaces/response-common/response.dto';
import AccountPayload from 'common/interfaces/account-payload/account.payload';
import { User } from 'schemas/user.schema';

@Injectable()
export class NotificationManangementService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    @Inject(forwardRef(() => UserManagementService)) private userService: UserManagementService
  ) { }

  async create(dto: CreateNotificationManangementDto) {
    try {
      const findUser = await this.userService.findOne(dto.userId);

      const newNotification = new this.notificationModel(dto);

      if (findUser) {
        findUser.notifications.push(newNotification);
        newNotification.user = findUser;
      }

      await newNotification.save();
      await findUser.save();
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR", error);
    }
  }

  async findAll(currentAccount: AccountPayload) {
    try {
      const findUser = await this.userService.findOneByAccountId(String(currentAccount.accountId));
      const findNoti = await this.notificationModel.find({ user: findUser.data });

      if (findNoti) {
        return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findNoti);
      } else {
        return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_ERROR");
      }
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_ERROR", error);
    }
  }

  async findOne(id: string) {
    try {
      const find = await this.notificationModel.findById(id);

      if (find) {
        return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", find);
      }
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }

  async updateState(
    dto: UpdateNotificationManangementDto,
    currentAccount: AccountPayload
  ) {
    try {
      const findUser = await this.userService.findOneByAccountId(String(currentAccount.accountId));
      const thisNoti = await this.notificationModel.findOne({ _id: dto.notificationId });

      if (!findUser.success || !thisNoti) {
        return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
      }

      if (!this.checkUserHaveRightWithNoti(findUser.data, thisNoti)) {
        return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
      }

      await this.notificationModel.findOneAndUpdate({ _id: thisNoti.id }, {
        $set: { state: dto.state }
      }).exec();

      return new ResponseCommon(HttpStatus.OK, true, "SUCCESS");
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }

  async checkUserHaveRightWithNoti(user: User, noti: NotificationDocument) {
    const allUserNoti = await this.notificationModel.find({
      user: user
    })

    const allUserNotiIds = allUserNoti.map(n => n.id);

    return allUserNotiIds.includes(noti.id);
  }
}
