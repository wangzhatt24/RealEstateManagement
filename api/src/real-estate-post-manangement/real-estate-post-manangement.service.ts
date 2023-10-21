import { HttpStatus, Inject, Injectable, Post, forwardRef } from '@nestjs/common';
import { CreateRealEstatePostManangementDto } from './dto/create-real-estate-post-manangement.dto';
import { UpdateRealEstatePostManangementDto } from './dto/update-real-estate-post-manangement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument, RealEstatePost } from 'schemas/post/post.schema';
import AccountPayload from 'common/interfaces/account-payload/account.payload';
import { UserManagementService } from 'src/user-management/user-management.service';
import { ResponseCommon } from 'common/interfaces/response-common/response.dto';
import { PostState } from 'schemas/post/post-state.schema';
import { BasicPostInformation } from 'schemas/post/basic-post-information.schema';
import { ContactPost } from 'schemas/post/contact-post.schema';
import { defaultPostState, s3Configs } from 'configs/configs';
import { Location } from 'schemas/location/location.schema';
import { ProvinceOrCity } from 'schemas/location/province-or-city.schema';
import { District } from 'schemas/location/district.schema';
import { Ward } from 'schemas/location/ward.schema';
import { Account } from 'schemas/account/account.schema';
import { User } from 'schemas/user.schema';
import { DeleteObjectCommandInput, DeleteObjectsCommandInput, PutObjectCommandInput } from '@aws-sdk/client-s3';
import formatFileName from 'common/utils/format.util';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class RealEstatePostManangementService {
  constructor(
    @InjectModel(RealEstatePost.name) private realEstatePostModel: Model<RealEstatePost>,
    @InjectModel(PostState.name) private postStateModel: Model<PostState>,
    @InjectModel(BasicPostInformation.name) private basicPostInformationModel: Model<BasicPostInformation>,
    @InjectModel(ContactPost.name) private contactPostModel: Model<ContactPost>,
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @InjectModel(ProvinceOrCity.name) private provinceOrCityModel: Model<ProvinceOrCity>,
    @InjectModel(District.name) private districtModel: Model<District>,
    @InjectModel(Ward.name) private wardModel: Model<Ward>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => UserManagementService)) private userService: UserManagementService,
    @InjectS3() private s3: S3
  ) { }

  async create(
    dto: CreateRealEstatePostManangementDto, 
    currentAccount: AccountPayload,
    realEstateImages: Array<Express.Multer.File>
  ) {
    try {
      // tìm user dựa trên current account 
      const findUser = await this.userService.findOneByAccountId(String(currentAccount.accountId));

      if (findUser.success === false) {
        return new ResponseCommon(HttpStatus.UNAUTHORIZED, false, "PERMISSION_DENIED");
      }

      // tạo post mới
      const newRealEstatePost = new this.realEstatePostModel({
        user: findUser.data
      })

      // tạo post state mới
      const newPostState = new this.postStateModel({
        state: defaultPostState.state,
        post: newRealEstatePost
      });

      // tạo bộ location mới
      const newProvinceOrCity = new this.provinceOrCityModel(dto.basicPostInformation.location.provinceOrCity);
      const newDistrict = new this.districtModel(dto.basicPostInformation.location.district);
      const newWard = new this.wardModel(dto.basicPostInformation.location.ward);
      const newLocation = new this.locationModel({
        provinceOrCity: newProvinceOrCity,
        district: newDistrict,
        ward: newWard
      });
      newProvinceOrCity.location = newLocation;
      newDistrict.location = newLocation;
      newWard.location = newLocation;

      // tạo basic post infor mới
      const newBasicPostInformation = new this.basicPostInformationModel(dto.basicPostInformation)

      // tạo contact post mới
      const newContactPostInformation = new this.contactPostModel(dto.contactPostInformation)

      // tạo bộ images mới
      const saveRealEstateImagesToS3Params: PutObjectCommandInput[] = realEstateImages.map(rei => {
        return {
          Bucket: s3Configs.bucket,
          Key: `users/${findUser.data.id}/posts/${newRealEstatePost.id}/${formatFileName(rei.originalname)}`,
          Body: rei.buffer
        }
      })

      // lấy key ảnh
      let realEstateImagesKeys = saveRealEstateImagesToS3Params.map(o => o.Key);
      
      // lưu vào s3 va bat loi
      for (let i = 0; i < saveRealEstateImagesToS3Params.length; i++) {
        await this.s3.putObject(saveRealEstateImagesToS3Params[i]).catch((rejectReason) => {
          return new ResponseCommon(
            HttpStatus.INTERNAL_SERVER_ERROR,
            false,
            'UPLOAD_TO_S3_FAILED',
            rejectReason
          )
        })
      }
      

      // link sections
      newBasicPostInformation.realEstateImages = realEstateImagesKeys;
      newBasicPostInformation.location = newLocation;

      newRealEstatePost.postState = newPostState;
      newRealEstatePost.basicPostInformation = newBasicPostInformation;
      newRealEstatePost.contactPost = newContactPostInformation;
      newRealEstatePost.user = findUser.data;


      if (!findUser.data.realEstatePosts) {
        findUser.data.realEstatePosts = [newRealEstatePost];
      } else {
        findUser.data.realEstatePosts.push(newRealEstatePost);
      }

      // save sections
      await Promise.all([
        newProvinceOrCity.save(),
        newDistrict.save(),
        newWard.save(),
        newLocation.save(),
        newRealEstatePost.save(),
        newPostState.save(),
        newContactPostInformation.save(),
        newBasicPostInformation.save(),
        findUser.data.save()
      ])

      return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", { postId: newRealEstatePost.id });

    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }

  async findAll() {
    try {
      const findResult = await this.realEstatePostModel.find().populate({
        path: 'user report userSavePosts postState contactPost'
      }).populate({
        path: 'basicPostInformation',
        populate: {
          path: 'location',
          populate: {
            path: 'provinceOrCity district ward'
          }
        }
      })

      if (findResult) {
        return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findResult);
      } else {
        return new ResponseCommon(HttpStatus.NOT_FOUND, false, "POST_NOT_FOUND");
      }
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }

  async findOneByPostId(postId: string): Promise<ResponseCommon<PostDocument>> {
    try {
      const findOne = await this.realEstatePostModel.findOne({ _id: postId }).populate({
        path: 'user report userSavePosts postState contactPost'
      }).populate({
        path: 'basicPostInformation',
        populate: {
          path: 'location',
          populate: {
            path: 'provinceOrCity district ward'
          }
        }
      })

      if (findOne) {
        return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findOne);
      } else {
        return new ResponseCommon(HttpStatus.NOT_FOUND, false, "POST_NOT_FOUND");
      }
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }

  async update(
    dto: UpdateRealEstatePostManangementDto,
    currentAccount: AccountPayload,
    realEstateImages: any[]
  ) {
    try {
      // kiểm tra xem tài khoản đang thao tác có quyền với post này không

      const checkPermission = await this.checkPermission(currentAccount, dto.postId);

      if (!checkPermission) {
        return new ResponseCommon(HttpStatus.UNAUTHORIZED, false, "PERMISSION_DENIED");
      }

      // xu ly update
      // update location and all related stuffs
      const findPost = await this.findOneByPostId(dto.postId);

      await this.provinceOrCityModel.findOneAndUpdate({
        _id: dto.basicPostInformation.location.provinceOrCity.provinceOrCityId
      }, dto.basicPostInformation.location.provinceOrCity);

      await this.districtModel.findOneAndUpdate({
        _id: dto.basicPostInformation.location.district.districtId
      }, dto.basicPostInformation.location.district);

      await this.wardModel.findOneAndUpdate({
        _id: dto.basicPostInformation.location.ward.wardId
      }, dto.basicPostInformation.location.ward);

      const { location, ...basicInforDto } = dto.basicPostInformation;
      await this.basicPostInformationModel.findOneAndUpdate({
        _id: dto.basicPostInformation.basicPostInforId
      }, basicInforDto);

      await this.contactPostModel.findOneAndUpdate({
        _id: dto.contactPostInformation.contactPostId
      }, dto.contactPostInformation);


      // tìm user dựa trên current account 
      const findUser = await this.userService.findOneByAccountId(String(currentAccount.accountId));

      // xóa bộ ảnh trước
      const deleteObjectParams: DeleteObjectsCommandInput = {
        Bucket: s3Configs.bucket,
        Delete: {
          Objects: findPost.data.basicPostInformation.realEstateImages.map(i => {
            return { Key: i }
          })
        }
      }
      
      await this.s3.deleteObjects(deleteObjectParams);

      // cập nhật ảnh phải cập nhật tất cả
      // tạo bộ images mới
      const saveRealEstateImagesToS3Params: PutObjectCommandInput[] = realEstateImages.map(rei => {
        return {
          Bucket: s3Configs.bucket,
          Key: `users/${findUser.data.id}/posts/${findPost.data.id}/${formatFileName(rei.originalname)}`,
          Body: rei.buffer
        }
      })

      // lấy key ảnh
      let realEstateImagesKeys = saveRealEstateImagesToS3Params.map(o => o.Key);
      
      // lưu vào s3 va bat loi
      for (let i = 0; i < saveRealEstateImagesToS3Params.length; i++) {
        await this.s3.putObject(saveRealEstateImagesToS3Params[i]).catch((rejectReason) => {
          return new ResponseCommon(
            HttpStatus.INTERNAL_SERVER_ERROR,
            false,
            'UPLOAD_TO_S3_FAILED',
            rejectReason
          )
        })
      }
      

      return new ResponseCommon(HttpStatus.OK, true, "SUCCESS");
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }

  async remove(id: string, currentAccount: AccountPayload) {
    const checkPermission = await this.checkPermission(currentAccount, id);

    if(checkPermission === false) {
      return new ResponseCommon(HttpStatus.UNAUTHORIZED, false, "PERMISSION_DENIED");
    }

    const findPost = await this.findOneByPostId(id);

    if(!findPost) {
      return findPost;
    }

    findPost.data.user.realEstatePosts = (findPost.data.user.realEstatePosts.filter(p => p !== p));
    await findPost.data.save();
    await this.basicPostInformationModel.deleteOne(findPost.data.basicPostInformation);
    await this.contactPostModel.deleteOne(findPost.data.contactPost);
    await findPost.data.deleteOne({
      _id: findPost.data
    }, );
  }

  async checkPermission(currentAccount: AccountPayload, postId: string) {
    // lay tat ca id post cua account
    // so sanh
    // nếu bộ post của account có chứa postId truyền vào thì đúng

    const findAccount = await this.accountModel.findOne({ _id: currentAccount.accountId });
    const findUser = await this.userModel.findOne({ _id: findAccount.user });
    const allPostOfUser = await this.realEstatePostModel.find({ user: findUser });
    const allPostId = allPostOfUser.map(apu => apu.id);

    return allPostId.includes(postId);
  }
}
