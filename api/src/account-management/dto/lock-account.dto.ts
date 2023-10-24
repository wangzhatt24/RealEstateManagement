import { ApiProperty } from "@nestjs/swagger";

export class lockAccountDto {
  @ApiProperty({ type: 'string' })
  lockedReason: string;

  @ApiProperty({ type: 'string' })
  targetId: string;
}