enum NoticeType {
  'SECURITY' = 'Безопасность',
}

export class NoticeDto {
  id: string;
  message: string;
  type: NoticeType;
  createdAt: string;

  constructor(
    id: string,
    message: string,
    type: NoticeType,
    createdAt: string,
  ) {
    this.id = id;
    this.message = message;
    this.type = type;
    this.createdAt = createdAt;
  }
}
