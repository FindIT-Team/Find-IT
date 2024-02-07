import { OmitType, PartialType } from '@nestjs/swagger';
import { NoticeEntity } from '../../../entities/notice.entity';

export class UpdateNoticeDto extends PartialType(
  OmitType(NoticeEntity, ['id', 'user', 'createdAt']),
) {}
