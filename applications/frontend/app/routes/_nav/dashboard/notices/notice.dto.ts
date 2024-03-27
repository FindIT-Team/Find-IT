enum NoticeType {
  'SECURITY' = 'Безопасность',
}

export class NoticeDto {
  id!: string;
  message!: string;
  type!: NoticeType;
  createdAt!: string;
}
