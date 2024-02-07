import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.usersRepository
        .create(createUserDto)
        .save();
      delete user.password;
      return user;
    } catch (err) {
      delete createUserDto.password;
      throw new UnprocessableEntityException(createUserDto, err);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.findOne({
      where: { id },
      select: ['id'],
    });

    try {
      Object.assign(user, updateUserDto);
      Object.assign(user, await user.save());
    } catch (err) {
      delete updateUserDto.password;
      throw new UnprocessableEntityException(updateUserDto, err);
    }

    delete user.password;

    return user;
  }

  async remove(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.findOne({
      where: { id },
      select: ['id', 'userToProjects', 'notices'],
    });

    try {
      await user.remove();
    } catch (err) {
      throw new UnprocessableEntityException(user, err);
    }

    if ((await this.findOne({ where: { id }, select: ['id'] })) !== null)
      throw new InternalServerErrorException(user);

    return user;
  }

  async findOne(options?: FindOneOptions<UserEntity>): Promise<UserEntity> {
    try {
      return await this.usersRepository.findOne(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async find(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    try {
      return await this.usersRepository.find(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async count(options?: FindManyOptions<UserEntity>): Promise<number> {
    try {
      return await this.usersRepository.count(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
