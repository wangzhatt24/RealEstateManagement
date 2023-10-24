import { HttpStatus, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { CreateAccountManagementDto } from './dto/create-account-management.dto';
import { UpdateAccountManagementDto } from './dto/update-account-management.dto';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Account, AccountDocument } from 'schemas/account/account.schema';
import mongoose, { Model, MongooseError } from 'mongoose';
import { ResponseCommon } from 'common/interfaces/response-common/response.dto';
import { User } from 'schemas/user.schema';
import { adminAccount, defaultUser, adminUser, defaultAccountState, bcryptConfigs } from 'configs/configs';
import { AccountState } from 'schemas/account/account-state.schema';
import ObjectIdDetecter from 'common/utils/object-id-mongoose-detec.util';
import { AuthService } from 'src/auth/auth.service';
import UpdatePasswordDto from './dto/update-password.dto';
import { UpdatePasswordByAccountIdDto } from './dto/update-password-by-id.dto';
import * as bcrypt from 'bcrypt'
import { lockAccountDto } from './dto/lock-account.dto';
import AccountPayload from 'common/interfaces/account-payload/account.payload';
import { UnlockAccountDto } from './dto/unlock-account.dto';


@Injectable()
export class AccountManagementService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(AccountState.name) private accountStateModel: Model<AccountState>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService
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

      if (ObjectIdDetecter(idOrUsername)) {
        // is id
        findResult = await this.accountModel.findOne({
          _id: idOrUsername,
        }).populate({
          path: 'user',
          populate: {
            path: 'broker',
          }
        }).populate('accountState').exec();

      } else {
        // is username
        findResult = await this.accountModel.findOne({
          username: idOrUsername,
        }).populate({
          path: 'user',
          populate: {
            path: 'broker',
          }
        }).populate('accountState').exec();
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

  async findOneByEmail(email: string): Promise<ResponseCommon<AccountDocument>> {
    try {
      const findAccount = await this.accountModel
        .findOne()
        .populate({
          path: 'user',
          match: {
            email: email
          }
        })
        .populate('accountState')
        .exec()

      if (findAccount) {
        return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findAccount)
      } else {
        return new ResponseCommon(HttpStatus.NOT_FOUND, false, "ACCOUNT_NOT_FOUND");
      }
    } catch (error) {
      return new ResponseCommon(HttpStatus.NOT_FOUND, false, "ACCOUNT_NOT_FOUND", error);
    }
  }

  // forgot password
  async updatePasswordByAccountId(dto: UpdatePasswordByAccountIdDto) {
    try {
      const findAccount = await this.findOneByIdOrUsername(dto.id);

      const account = findAccount.data;

      if (!await bcrypt.compare(dto.oldPassword, account.password)) {
        return new ResponseCommon(HttpStatus.CONFLICT, false, "PASSWORD_INCORRECT");
      }

      account.password = dto.newPassword;

      const updatePassword = await account.save();

      if (updatePassword) {
        return new ResponseCommon(HttpStatus.OK, true, "PASSWORD_UPDATED_SUCCESSFULLY")
      } else {
        return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR")
      }
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR", error)
    }
  }

  //update forgot password
  async updateAccountByUserName(
    username: string,
    dto: UpdateAccountManagementDto,
  ): Promise<ResponseCommon<any>> {
    try {
      const findAccount = await this.accountModel.findOne({ username: username });
      findAccount.password = dto.newPassword;
      const updateAccount = findAccount.save()

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

  async updateForgotPasswordAccount(dto: UpdatePasswordDto) {
    try {
      const payload = await this.authService.verifyToken(dto.token);

      const updatePassword = await this.updateAccountByUserName(payload.username, { newPassword: dto.newPassword })

      if (updatePassword) {
        return new ResponseCommon(HttpStatus.OK, true, "ACCOUNT_UPDATED_SUCCESSFULLY")
      } else {
        return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "UPDATE_PASSWORD_ERROR_OCCUR")
      }
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "ERROR_ORCUR", error)
    }
  }

  async lockAccount(
    dto: lockAccountDto,
    currentAccount: AccountPayload
  ) {
    const executorAccount = await this.accountModel.findOne({ _id: currentAccount.accountId });
    const targetAccount = await this.accountModel.findOne({ _id: dto.targetId }).populate('accountState');

    if (!this.checkPessmisionLock(executorAccount, targetAccount)) {
      return new ResponseCommon(HttpStatus.FORBIDDEN, false, "PERMISSION_DENIED");
    }

    const updateAccount = await this.accountStateModel.findOneAndUpdate({
      _id: targetAccount.accountState
    }, {
      $set: {
        lockedReason: dto.lockedReason,
        executor: executorAccount,
        target: targetAccount
      }
    }, { new: true })


    return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", updateAccount);
  }

  async unLockAccount(
    dto: UnlockAccountDto,
    currentAccount: AccountPayload
  ) {
    const executorAccount = await this.accountModel.findOne({ _id: currentAccount.accountId });
    const targetAccount = await this.accountModel.findOne({ _id: dto.targetId }).populate('accountState');

    if (!this.checkPessmisionLock(executorAccount, targetAccount)) {
      return new ResponseCommon(HttpStatus.FORBIDDEN, false, "PERMISSION_DENIED");
    }

    await this.accountStateModel.updateOne({
      _id: targetAccount.accountState
    }, {
      $set: {
        lockedReason: "",
        executor: executorAccount,
        target: targetAccount
      }
    })

    return new ResponseCommon(HttpStatus.OK, true, "ACCOUNT_UNLOCKED_SUCCESSFULLY");
  }

  checkPessmisionLock(
    currentAccount: AccountDocument,
    targetAccount: AccountDocument
  ) {
    // mở khóa: chỉ chủ account và admin
    // khóa: tương tự như trên
    if (currentAccount.isAdmin === true) {
      return true;
    }

    return targetAccount.id === currentAccount.id
  }

  async removeAllAccount() {
    const allAccount = await this.accountModel.find().exec();

    return await this.accountModel.deleteMany({
      _id: allAccount.map((a) => a.id),
    });
  }
}
