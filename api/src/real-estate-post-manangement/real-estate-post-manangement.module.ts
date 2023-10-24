import { Module, forwardRef } from '@nestjs/common';
import { RealEstatePostManangementService } from './real-estate-post-manangement.service';
import { RealEstatePostManangementController } from './real-estate-post-manangement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RealEstatePost, PostSchema } from 'schemas/post/post.schema';
import { UserSavePosts, UserSavePostsSchema } from 'schemas/post/user-save-posts.schema';
import { PostState, PostStateSchema } from 'schemas/post/post-state.schema';
import { BasicPostInformation, BasicPostInformationSchema } from 'schemas/post/basic-post-information.schema';
import { ContactPost, ContactPostSchema } from 'schemas/post/contact-post.schema';
import { UserManagementModule } from 'src/user-management/user-management.module';
import { Location, LocationSchema } from 'schemas/location/location.schema';
import { ProvinceOrCity, ProvinceOrCitySchema } from 'schemas/location/province-or-city.schema';
import { District, DistrictSchema } from 'schemas/location/district.schema';
import { Ward, WardSchema } from 'schemas/location/ward.schema';
import { Account, AccountSchema } from 'schemas/account/account.schema';
import { User, UserSchema } from 'schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RealEstatePost.name, schema: PostSchema },
      { name: UserSavePosts.name, schema: UserSavePostsSchema },
      { name: PostState.name, schema: PostStateSchema },
      { name: BasicPostInformation.name, schema: BasicPostInformationSchema },
      { name: ContactPost.name, schema: ContactPostSchema },
      { name: Location.name, schema: LocationSchema },
      { name: ProvinceOrCity.name, schema: ProvinceOrCitySchema },
      { name: District.name, schema: DistrictSchema },
      { name: Ward.name, schema: WardSchema },
      { name: Account.name, schema: AccountSchema },
      { name: User.name, schema: UserSchema }
    ]),
    forwardRef(() => UserManagementModule)
  ],
  controllers: [RealEstatePostManangementController],
  providers: [RealEstatePostManangementService]
})
export class RealEstatePostManangementModule {}
