import { IntersectionType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class RegisterDto extends IntersectionType(CreateUserDto) {}
