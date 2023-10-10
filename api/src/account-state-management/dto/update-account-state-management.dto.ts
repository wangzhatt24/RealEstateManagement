import { PartialType } from '@nestjs/swagger';
import { CreateAccountStateManagementDto } from './create-account-state-management.dto';

export class UpdateAccountStateManagementDto extends PartialType(
  CreateAccountStateManagementDto,
) {}
