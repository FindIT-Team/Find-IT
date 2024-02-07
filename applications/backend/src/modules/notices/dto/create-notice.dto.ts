import { PickType } from '@nestjs/swagger';
import { NoticeEntity } from '../../../entities/notice.entity';

export class CreateNoticeDto extends PickType(NoticeEntity, [
  'type',
  'message',
]) {}
