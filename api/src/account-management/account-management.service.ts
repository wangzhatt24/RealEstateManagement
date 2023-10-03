import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountManagementDto } from './dto/create-account-management.dto';
import { UpdateAccountManagementDto } from './dto/update-account-management.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from 'schemas/account/account.schema';
import { Model, MongooseError } from 'mongoose';
import { ResponseCommon } from 'interfaces/response-common/response.dto';

@Injectable()
export class AccountManagementService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>
  ) { }

  async create(createAccountManagementDto: CreateAccountManagementDto): Promise<ResponseCommon<AccountDocument>> {
    try {
      const newAccount = await this.accountModel.create(createAccountManagementDto);
      const saveNewAccount = await newAccount.save();

      /**
       * Lưu và bắt lỗi lưu nếu có
       */
      if (saveNewAccount) {
        return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", saveNewAccount)
      } else {
        return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR")
      }
    } catch (error) {
      return new ResponseCommon(500, false, "INTERNAL_SERVER_ERROR", error)
    }
  }

  async findAll(): Promise<ResponseCommon<Account[]>> {
    try {
      const findAll = await this.accountModel.find().exec();

      if (findAll) {
        return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findAll)
      } else {
        return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR")
      }
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR", error)
    }
  }

  async findOneByUserName(username: string): Promise<ResponseCommon<AccountDocument>> {
    try {
      const findResult = await this.accountModel.findOne({ username });

      if (findResult) {
        return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findResult)
      } else {
        return new ResponseCommon(HttpStatus.NOT_FOUND, false, "ACCOUNT_NOT_FOUND")
      }
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR", error);
    }
  }

  async updateAccountById(id: number, updateAccountManagementDto: UpdateAccountManagementDto) {
    return "not implement yet"
  }

  async updateAccountByUserName(username: string, updateAccountManagementDto: UpdateAccountManagementDto): Promise<ResponseCommon<Account>> {
    try {
      const updateAccount = await this.accountModel.findOneAndUpdate(
        { username },
        { $set: updateAccountManagementDto },
        { new: true }
      );
        
      if(updateAccount) {
        return new ResponseCommon(HttpStatus.OK, true, "ACCOUNT_UPDATED", updateAccount)
      } else {
        return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR")
      }
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR", error)
    }
  }

  async removeAllAccount() {
    const allAccount = await this.accountModel.find().exec()

    return await this.accountModel.deleteMany({ _id: allAccount.map(a => a.id) })
  }
}
