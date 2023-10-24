import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UploadedFiles, HttpStatus, ValidationPipe } from '@nestjs/common';
import { RealEstatePostManangementService } from './real-estate-post-manangement.service';
import { CreateRealEstatePostManangementDto } from './dto/create-real-estate-post-manangement.dto';
import { UpdateRealEstatePostManangementDto } from './dto/update-real-estate-post-manangement.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CurrentAccount } from 'common/decorators/current-account.decorator';
import AccountPayload from 'common/interfaces/account-payload/account.payload';
import { FilesInterceptor } from '@nestjs/platform-express';
import { realEstateImagesConfigs } from 'configs/configs';
import { ResponseCommon } from 'common/interfaces/response-common/response.dto';
import { BasicPostInformation } from 'schemas/post/basic-post-information.schema';
import { CreateContactPostInformationDto } from './dto/contact-post/create-contact-post.dto';
import { CreateBasicPostInformationDto } from './dto/basic-post-information/create-basic-post-information.dto';

@ApiTags("Real Estate Post Management")
@ApiBearerAuth()
@Controller('real-estate-post-manangement')
export class RealEstatePostManangementController {
  constructor(private readonly realEstatePostManangementService: RealEstatePostManangementService) {}

  @Post('/posts')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateRealEstatePostManangementDto })
  @UseInterceptors(FilesInterceptor('realEstateImages'))
  create(
    @Body() dto: CreateRealEstatePostManangementDto,
    @CurrentAccount() currentAccount: AccountPayload,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: realEstateImagesConfigs.maxSize }),
          new FileTypeValidator({ fileType: realEstateImagesConfigs.fileTypeRegex }),
        ],
      }),
    ) realEstateImages: any[],
  ) {

    const createBasicPostInformationDto = JSON.parse(String(dto.basicPostInformation));
    const createContactPostInformationDto = JSON.parse(String(dto.contactPostInformation));

    dto.basicPostInformation = createBasicPostInformationDto;
    dto.contactPostInformation = createContactPostInformationDto;
    
    if(realEstateImages.length > 10) {
      return new ResponseCommon(HttpStatus.BAD_REQUEST, false, "PHOTOS_EXCEEDS_10");
    }

    if(realEstateImages.length < 3) {
      return new ResponseCommon(HttpStatus.BAD_REQUEST, false, "ATLEAST_3_PHOTOS");
    }

    return this.realEstatePostManangementService.create(dto, currentAccount, realEstateImages);
  }

  @Get('all-posts')
  findAll() {
    return this.realEstatePostManangementService.findAll();
  }

  @Get('/posts/:id')
  findOne(@Param('id') id: string) {
    return this.realEstatePostManangementService.findOneByPostId(id);
  }

  @Patch('/update-post')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('realEstateImages'))
  update(
    @Body() dto: UpdateRealEstatePostManangementDto, 
    @CurrentAccount() currentAccount: AccountPayload,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: realEstateImagesConfigs.maxSize }),
          new FileTypeValidator({ fileType: realEstateImagesConfigs.fileTypeRegex }),
        ],
      }),
    ) realEstateImages: any[],
  ) {

    const updateBasicPostInformationDto = JSON.parse(String(dto.basicPostInformation));
    const updateContactPostInformationDto = JSON.parse(String(dto.contactPostInformation));

    dto.basicPostInformation = updateBasicPostInformationDto;
    dto.contactPostInformation = updateContactPostInformationDto;
    
    if(realEstateImages.length > 10) {
      return new ResponseCommon(HttpStatus.BAD_REQUEST, false, "PHOTOS_EXCEEDS_10");
    }

    if(realEstateImages.length < 3) {
      return new ResponseCommon(HttpStatus.BAD_REQUEST, false, "ATLEAST_3_PHOTOS");
    }

    return this.realEstatePostManangementService.update(dto, currentAccount, realEstateImages);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentAccount() currentAccount: AccountPayload) {
    return this.realEstatePostManangementService.remove(id, currentAccount);
  }
}
