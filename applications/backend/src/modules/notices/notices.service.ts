import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { NoticeEntity } from '../../entities/notice.entity';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(NoticeEntity)
    private readonly noticesRepository: Repository<NoticeEntity>,
  ) {}

  async create(
    createNoticeDto: CreateNoticeDto & { user: UserEntity },
  ): Promise<NoticeEntity> {
    try {
      return await this.noticesRepository.create(createNoticeDto).save();
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async update(
    id: string,
    updateNoticeDto: UpdateNoticeDto & { user?: UserEntity },
  ): Promise<NoticeEntity> {
    const notice: NoticeEntity = await this.findOne({
      where: { id, user: updateNoticeDto.user },
      select: ['id'],
    });

    try {
      Object.assign(notice, updateNoticeDto);
      Object.assign(notice, await notice.save());
    } catch (err) {
      throw new UnprocessableEntityException(updateNoticeDto, err);
    }

    return notice;
  }

  async remove(id: string, user?: UserEntity): Promise<NoticeEntity> {
    const notice: NoticeEntity = await this.findOne({
      where: { id, user },
      select: ['id', 'removedAt'],
    });

    try {
      if (!notice.removedAt) await notice.softRemove();
      else await notice.remove();
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }

    if (
      !(
        (await this.findOne({ where: { id }, select: ['removedAt'] }))
          .removedAt || (await this.findOne({ where: { id }, select: ['id'] }))
      )
    )
      throw new InternalServerErrorException(notice);

    return notice;
  }

  async findOne(options?: FindOneOptions<NoticeEntity>): Promise<NoticeEntity> {
    try {
      return await this.noticesRepository.findOne(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async find(options?: FindManyOptions<NoticeEntity>): Promise<NoticeEntity[]> {
    try {
      return await this.noticesRepository.find(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async count(options?: FindManyOptions<NoticeEntity>): Promise<number> {
    try {
      return await this.noticesRepository.count(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
