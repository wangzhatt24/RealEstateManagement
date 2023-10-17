import { HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateBrokerManagementDto } from './dto/create-broker-management.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BrokerageField } from 'schemas/broker/brokerage-field.schema';
import { Model } from 'mongoose';
import { ProvinceOrCity } from 'schemas/location/province-or-city.schema';
import { District } from 'schemas/location/district.schema';
import { Ward } from 'schemas/location/ward.schema';
import { Location } from 'schemas/location/location.schema';
import { Broker, BrokerDocument } from 'schemas/broker/broker.schema';
import { ResponseCommon } from 'common/interfaces/response-common/response.dto';
import AccountPayload from 'common/interfaces/account-payload/account.payload';
import { UserManagementService } from 'src/user-management/user-management.service';
import { AccountManagementService } from 'src/account-management/account-management.service';

@Injectable()
export class BrokerManagementService {
  constructor(
    @InjectModel(Broker.name) private brokerModel: Model<Broker>,
    @InjectModel(BrokerageField.name) private brokerageFieldModel: Model<BrokerageField>,
    @InjectModel(ProvinceOrCity.name) private provinceOrCityModel: Model<ProvinceOrCity>,
    @InjectModel(District.name) private districtModel: Model<District>,
    @InjectModel(Ward.name) private wardModel: Model<Ward>,
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @Inject(forwardRef(() => UserManagementService)) private userService: UserManagementService,
    @Inject(forwardRef(() => AccountManagementService)) private accountService: AccountManagementService
  ) { }

  async create(dto: CreateBrokerManagementDto) {
    try {
      const newProvinceOrCity = new this.provinceOrCityModel(dto.brokerageField.location.provinceOrCity);
      const newDistrict = new this.districtModel(dto.brokerageField.location.district);
      const newWard = new this.wardModel(dto.brokerageField.location.ward);
      const newLocation = new this.locationModel(dto.brokerageField.location);
      const newBrokerageField = new this.brokerageFieldModel(dto.brokerageField);
      const findUser = await this.userService.findOne(dto.userId);
      const newBroker = new this.brokerModel(dto);

      // gán cho location ward,...
      newLocation.provinceOrCity = newProvinceOrCity;
      newLocation.district = newDistrict;
      newLocation.ward = newWard;

      // gán location cho newBrokerageField 
      newBrokerageField.location = newLocation;

      // gán user cho newBroker
      newBroker.user = findUser;

      // gán newBrokerageField cho newBroker
      if (!newBroker.brokerageFields) {
        newBroker.brokerageFields = [];
      }
      newBroker.brokerageFields.push(newBrokerageField);

      // Lưu broker
      const saveBroker = await newBroker.save();

      // lưu những cái còn lại
      await newBrokerageField.save();
      await newLocation.save();
      await newProvinceOrCity.save();
      await newDistrict.save();
      await newWard.save();

      return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", saveBroker);

    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }

  async findAll() {
    try {
      const findAll = await this.brokerModel.find().populate({
        path: 'brokerageFields',
        populate: {
          path: 'location',
          populate: {
            path: 'provinceOrCity district ward'
          }
        }
      })

      return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findAll);
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }

  async findOne(id: string) {
    try {
      const findOne = await this.brokerModel.find({ _id: id }).populate({
        path: 'brokerageFields',
        populate: {
          path: 'location',
          populate: {
            path: 'provinceOrCity district ward'
          }
        }
      });

      return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findOne);
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }

  async remove(id: string, currentAccount: AccountPayload) {
    try {
      // kiểm tra nếu đúng tài khoản hiện tại đang thao tác thì mới cho xóa

      // tìm tài khoản hiện tại
      const findCurrentAccount = await this.accountService.findOneByIdOrUsername(currentAccount.username);
      const findUser = await this.userService.findOneByAccountId(findCurrentAccount.data.id);
      const findBroker = await this.brokerModel.findOne({ user: findUser.data.id });

      if (findBroker && findBroker?.id !== id) {
        return new ResponseCommon(HttpStatus.UNAUTHORIZED, false, "UNAUTHORIZED");
      }

      // nếu tìm thấy broker
      // xóa luôn brokerage fiede và 
      if((await this.deleteAllBrokerRelatedDocs(findBroker)).success === false) {
        return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
      }
      await findBroker.deleteOne();

      return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findBroker);
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }

  async removeAllBroker() {
    const findAllBroker = await this.brokerModel.find();
    findAllBroker.forEach(async b => {
      await this.deleteAllBrokerRelatedDocs(b);
    })

    const allBrokerId = findAllBroker.map(b => b.id);
    await this.brokerModel.deleteMany({ _id: allBrokerId });

    return true;
  }

  async deleteAllBrokerRelatedDocs(findBroker: BrokerDocument) {
    try {
      const deleteRelatedBrokerageFields = await this.brokerageFieldModel.findOneAndDelete({ broker: findBroker });
      const deleteRelatedProvinceOrCity = await this.provinceOrCityModel.findOneAndDelete({ localtion: deleteRelatedBrokerageFields });
      const deleteRelatedDistrict = await this.districtModel.findOneAndDelete({ localtion: deleteRelatedBrokerageFields });
      const deleteRelatedWard = await this.wardModel.findOneAndDelete({ localtion: deleteRelatedBrokerageFields });

      return new ResponseCommon(HttpStatus.OK, true, "SUCCESS");
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }
}

