import { Module, forwardRef } from '@nestjs/common';
import { BrokerManagementService } from './broker-management.service';
import { BrokerManagementController } from './broker-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BrokerageField, BrokerageFieldSchema } from 'schemas/broker/brokerage-field.schema';
import { ProvinceOrCity, ProvinceOrCitySchema } from 'schemas/location/province-or-city.schema';
import { District, DistrictSchema } from 'schemas/location/district.schema';
import { Ward, WardSchema } from 'schemas/location/ward.schema';
import { Location, LocationSchema } from 'schemas/location/location.schema';
import { Broker, BrokerSchema } from 'schemas/broker/broker.schema';
import { AccountManagementModule } from 'src/account-management/account-management.module';
import { UserManagementModule } from 'src/user-management/user-management.module';
import { AccountManagementService } from 'src/account-management/account-management.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Broker.name, useFactory: () => {
          const schema = BrokerSchema;
          
          return schema;
        }
      },
      {
        name: BrokerageField.name, useFactory: () => {
          const schema = BrokerageFieldSchema;
          
          // middleware go here

          return schema;
        }
      },
      {
        name: ProvinceOrCity.name, useFactory: () => {
          const schema = ProvinceOrCitySchema;

          return schema;
        }
      },
      {
        name: District.name, useFactory: () => {
          const schema = DistrictSchema;

          return schema;
        }
      },
      {
        name: Ward.name, useFactory: () => {
          const schema = WardSchema;

          return schema;
        }
      },
      {
        name: Location.name, useFactory: () => {
          const schema = LocationSchema;

          return schema;
        }
      }
    ]),
    forwardRef(() => AccountManagementModule),
    forwardRef(() => UserManagementModule)
  ],
  controllers: [BrokerManagementController],
  providers: [BrokerManagementService],
  exports: [BrokerManagementService]
})
export class BrokerManagementModule {}
