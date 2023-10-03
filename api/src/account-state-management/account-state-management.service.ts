import { Injectable } from '@nestjs/common';
import { CreateAccountStateManagementDto } from './dto/create-account-state-management.dto';
import { UpdateAccountStateManagementDto } from './dto/update-account-state-management.dto';
import { AccountState } from 'schemas/account/account-state.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AccountStateManagementService {
  constructor(
    @InjectModel(AccountState.name) private accountStateModel: Model<AccountState>
  ) { }

  create(dto: CreateAccountStateManagementDto) {
    // return this.
  }

  findAll() {
    return `This action returns all accountStateManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountStateManagement`;
  }

  update(id: number, updateAccountStateManagementDto: UpdateAccountStateManagementDto) {
    return `This action updates a #${id} accountStateManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountStateManagement`;
  }
}
