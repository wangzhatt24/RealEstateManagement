import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountManagementDto } from './dto/create-account-management.dto';
import { UpdateAccountManagementDto } from './dto/update-account-management.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from 'schemas/account/account.schema';
import { Model, MongooseError } from 'mongoose';
import { ResponseCommon } from 'common/interfaces/response-common/response.dto';
import { User } from 'schemas/user.schema';
import { adminAccount, defaultUser, adminUser, defaultAccountState } from 'configs/configs';
import { AccountState } from 'schemas/account/account-state.schema';
import ObjectIdDetecter from 'common/utils/object-id-mongoose-detec.util';

@Injectable()
export class AccountManagementService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(AccountState.name) private accountStateModel: Model<AccountState>
  ) { }

  async createAdminAccount(): Promise<any> {
    try {
      const findAdmin = await this.accountModel.find({ isAdmin: true })

      if (findAdmin.length !== 0) {
        console.log(`Admin Seeded`);
        return true;
      }

      // tạo account mới
      const newAccount = new this.accountModel(adminAccount);

      // tạo user mới
      const newUser = new this.userModel({
        ...adminUser,
        account: newAccount,
      });

      // tạo account state
      const newAccountState = new this.accountStateModel({
        lockedReason: defaultAccountState.executor,
        executor: newAccount,
        target: newAccount
      })

      // Gán user này cho account
      newAccount.user = newUser;

      // Gán account state này cho account
      newAccount.accountState = newAccountState;

      // Lưu account
      const saveNewAccount = await newAccount.save();

      // Lưu user
      const saveNewUser = await newUser.save();

      // Lưu account state
      const saveNewAccountState = await newAccountState.save();

      /**
       * Bắt lỗi lưu nếu có
       */
      if (saveNewAccount && saveNewUser && saveNewAccountState) {
        console.log(`Admin Seeded`)
      } else {
        return new ResponseCommon(500, false, 'ADMIN_SEEDING_FAILED');
      }
    } catch (error) {
      return new ResponseCommon(500, false, 'ADMIN_SEEDING_FAILED', error);
    }
  }

  async create(dto: CreateAccountManagementDto): Promise<ResponseCommon<any>> {
    try {
      // tạo account mới
      const newAccount = new this.accountModel(dto);

      // tạo user mới
      const newUser = new this.userModel({
        ...defaultUser,
        account: newAccount,
      });

      // tạo account state mới
      const newAccountState = new this.accountStateModel({
        lockedReason: defaultAccountState.lockedReason,
        executor: newAccount,
        target: newAccount
      })

      // Gán user này cho account
      newAccount.user = newUser;

      // gán account state này cho account
      newAccount.accountState = newAccountState;

      // Lưu account
      const saveNewAccount = await newAccount.save();

      // Lưu user
      const saveNewUser = await newUser.save();

      // Lưu account state
      const saveNewAccountState = await newAccountState.save()

      /**
       * Bắt lỗi lưu nếu có
       */
      if (saveNewAccount && saveNewUser && saveNewAccountState) {
        return new ResponseCommon(HttpStatus.OK, true, 'SUCCESS');
      } else {
        return new ResponseCommon(
          HttpStatus.INTERNAL_SERVER_ERROR,
          false,
          'INTERNAL_SERVER_ERROR',
        );
      }
    } catch (error) {
      return new ResponseCommon(500, false, 'INTERNAL_SERVER_ERROR', error);
    }
  }

  async findAll(): Promise<ResponseCommon<Account[]>> {
    try {
      const findAll = await this.accountModel.find().populate(['user', 'accountState']).exec();

      if (findAll) {
        return new ResponseCommon(HttpStatus.OK, true, 'SUCCESS', findAll);
      } else {
        return new ResponseCommon(
          HttpStatus.INTERNAL_SERVER_ERROR,
          false,
          'INTERNAL_SERVER_ERROR',
        );
      }
    } catch (error) {
      return new ResponseCommon(
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        'INTERNAL_SERVER_ERROR',
        error,
      );
    }
  }

  async findOneByIdOrUsername(
    idOrUsername: string,
  ): Promise<ResponseCommon<AccountDocument>> {
    try {
      let findResult = undefined;

      if(ObjectIdDetecter(idOrUsername)) {
        // is id
        findResult = await this.accountModel.findOne({
          _id: idOrUsername,
        }).populate('user').populate('accountState').exec();
      } else {
        // is username
        findResult = await this.accountModel.findOne({
          username: idOrUsername,
        }).populate('user').populate('accountState').exec();
      }
      
      if (findResult) {
        return new ResponseCommon(HttpStatus.OK, true, 'SUCCESS', findResult);
      } else {
        return new ResponseCommon(
          HttpStatus.NOT_FOUND,
          false,
          'ACCOUNT_NOT_FOUND',
        );
      }
    } catch (error) {
      return new ResponseCommon(
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        'INTERNAL_SERVER_ERROR',
        error,
      );
    }
  }

  async updateAccountById(
    id: string,
    dto: UpdateAccountManagementDto,
  ) {
    return 'not implement yet';
  }

  async updateAccountByUserName(
    username: string,
    updateAccountManagementDto: UpdateAccountManagementDto,
  ): Promise<ResponseCommon<Account>> {
    try {
      const updateAccount = await this.accountModel.findOneAndUpdate(
        { username },
        { $set: updateAccountManagementDto },
        { new: true },
      );

      if (updateAccount) {
        return new ResponseCommon(
          HttpStatus.OK,
          true,
          'ACCOUNT_UPDATED',
          updateAccount,
        );
      } else {
        return new ResponseCommon(
          HttpStatus.INTERNAL_SERVER_ERROR,
          false,
          'INTERNAL_SERVER_ERROR',
        );
      }
    } catch (error) {
      return new ResponseCommon(
        HttpStatus.INTERNAL_SERVER_ERROR,
        false,
        'INTERNAL_SERVER_ERROR',
        error,
      );
    }
  }

  async removeAllAccount() {
    const allAccount = await this.accountModel.find().exec();

    return await this.accountModel.deleteMany({
      _id: allAccount.map((a) => a.id),
    });
  }
}
