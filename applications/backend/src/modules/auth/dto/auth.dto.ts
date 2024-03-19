import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'ivanpetrov@gmail.com',
    description: 'The email or username of the profile',
  })
  uniq: string;

  @ApiProperty({
    example: 'L2lda@*saw',
    description: 'The password of the profile',
  })
  password: string;
}
