import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { User, UserSchema } from 'schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
