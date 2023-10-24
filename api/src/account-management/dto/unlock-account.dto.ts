import { ApiProperty } from "@nestjs/swagger";

export class UnlockAccountDto {
  @ApiProperty({ type: 'string' })
  targetId: string;
}