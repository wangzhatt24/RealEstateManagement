import { HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseCommon } from 'common/interfaces/response-common/response.dto';
import { Model } from 'mongoose';
import { InjectS3, S3 } from 'nestjs-s3';
import { User, UserDocument } from 'schemas/user.schema';
import { s3Configs } from 'configs/configs';
import formatFileName from 'common/utils/format.util';
import { getAvatarPrefix } from 'common/utils/s3.utils';
import { PutObjectCommandInput } from '@aws-sdk/client-s3';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectS3() private s3: S3,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getUserAvatar(userId: string) {
    const s3GetParams = {
      Bucket: s3Configs.bucket,
      Delimiter: '/',
      Prefix: getAvatarPrefix(userId),
    };

    const allObject = await this.s3.listObjects(s3GetParams);

    return allObject.Contents;
  }

  async create(dto: CreateUserManagementDto, avatar: Express.Multer.File) {
    try {
      // Kiểm tra user đã tồn tại
      const userExistence = await this.userModel.findOne({
        account: dto.account,
      });

      if (userExistence) {
        return new ResponseCommon(
          HttpStatus.CONFLICT,
          false,
          'USER_ALREADY_EXISTED',
          userExistence,
        );
      }

      // Nếu chưa tồn tại thì tạo user mới
      const newUser = await this.userModel.create(dto);

      const saveToS3Params: PutObjectCommandInput = {
        Bucket: s3Configs.bucket,
        Key: `users/${newUser.id}/avatar/${formatFileName(
          avatar.originalname,
        )}`,
        Body: avatar.buffer,
      };

      await this.s3.putObject(saveToS3Params).catch((rejectReason) => {
        return new ResponseCommon(
          HttpStatus.INTERNAL_SERVER_ERROR,
          false,
          'UPLOAD_TO_S3_FAILED',
          rejectReason,
        );
      });

      // Đặt avatar trong user
      newUser.avatar = saveToS3Params.Key;

      const saveUser = await newUser.save();

      if (saveUser) {
        return new ResponseCommon(HttpStatus.OK, true, 'SUCCESS', newUser);
      } else {
        return new ResponseCommon(
          HttpStatus.INTERNAL_SERVER_ERROR,
          true,
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

  async findAll() {
    try {
      const findResult = await this.userModel.find().populate(['account', 'broker']).exec();

      if (findResult) {
        return new ResponseCommon(HttpStatus.OK, true, 'SUCCESS', findResult);
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

  async findOne(id: string) {
    return (await this.userModel.findById(id)).populate({
      path: 'account broker'
    });
  }

  async findOneByAccountId(accountId: string): Promise<ResponseCommon<UserDocument>> {
    try {
      const findUserByAccountId = await this.userModel.findOne({ account: accountId }).populate({
        path: 'broker realEstatePosts notifications'
      });

      return new ResponseCommon(HttpStatus.OK, true, "SUCCESS", findUserByAccountId);
    } catch (error) {
      return new ResponseCommon(HttpStatus.INTERNAL_SERVER_ERROR, false, "INTERNAL_SERVER_ERROR");
    }
  }

  // update(id: number, updateUserManagementDto: UpdateUserManagementDto) {
  //   return `This action updates a #${id} userManagement`;
  // }

  async remove(id: string) {
    return await this.userModel.findOneAndRemove({ _id: id });
  }

  async removeAllUser() {
    const allUser = await this.userModel.find().exec();
    return await this.userModel.deleteMany({
      _id: allUser.map((user) => user.id),
    });
  }
}
