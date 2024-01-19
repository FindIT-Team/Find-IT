import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'notices' })
export class NoticeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  message: string;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @DeleteDateColumn()
  removedAt: Date;

  @ManyToOne(() => UserEntity, (e) => e.notices)
  user: UserEntity;
}
