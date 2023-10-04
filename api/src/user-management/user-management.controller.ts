import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, HttpStatus } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { CreateUserManagementDto } from './dto/create-user-management.dto';
import { UpdateUserManagementDto } from './dto/update-user-management.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { avatarConfigs } from 'configs/configs';
import { InjectS3, S3 } from 'nestjs-s3';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'schemas/user.schema';
import { Model } from 'mongoose';
import { ResponseCommon } from 'common/interfaces/response-common/response.dto';

@ApiTags("User Management")
@Controller('user-management')
export class UserManagementController {
  constructor(
    private readonly userManagementService: UserManagementService
  ) { }

  @Get('user-avatar/:id')
  getUserAvatar(@Param('id') id: string) {
    console.log(id)
    return this.userManagementService.getUserAvatar(id)
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  create(@Body() createUserManagementDto: CreateUserManagementDto, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: avatarConfigs.maxSize }),
        new FileTypeValidator({ fileType: avatarConfigs.fileTypeRegex })
      ]
    })
  ) avatar: Express.Multer.File) {
    return this.userManagementService.create(createUserManagementDto, avatar)
  }

  @Get()
  findAll() {
    return this.userManagementService.findAll();
  }

  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.userManagementService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserManagementDto: UpdateUserManagementDto) {
  //   return this.userManagementService.update(+id, updateUserManagementDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userManagementService.remove(id);
  }

  @Get('remove-all-user')
  removeAllUser() {
    return this.userManagementService.removeAllUser();
  }
}
