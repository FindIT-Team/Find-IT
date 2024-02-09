import { ApiProperty } from '@nestjs/swagger';

export class UsernameAvailableDto {
  @ApiProperty({ description: 'Is username available', example: false })
  isAvailable: boolean;
}
