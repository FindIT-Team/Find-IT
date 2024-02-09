import {
  AfterUpdate,
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ProjectsToUsersEntity } from './projects-to-users.entity';
import { NoticeEntity } from './notice.entity';
import { ApiExtraModels, ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Subscription } from './extra/subscription.enum';
import { faker } from '@faker-js/faker';
import { Gender } from './extra/gender.enum';

@ApiExtraModels()
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiHideProperty()
  id: string;

  @Column('json', {
    default: { type: Subscription.FREE, expiresIn: null },
  })
  @ApiProperty({
    description: 'Subscription type and expiration date',
    example: {
      type: Subscription.PRO,
      expiresIn: new Date(Date.now() + Math.random() * 10000000),
    },
  })
  subscription: { type: Subscription; expiresIn: Date };

  @Column('json', { default: [] })
  @ApiProperty({
    description: 'User actions log',
    example: [],
  })
  history: { action: string; date: Date }[];

  @Column({ select: false })
  @ApiHideProperty()
  password: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Username', example: 'ivan-petrov' })
  username: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Email', example: 'ivanpetrov@gmail.com' })
  email: string;

  @Column({ default: 'user' })
  @ApiProperty({ description: 'Role', example: 'admin' })
  role: string;

  @Column('json', {
    default: { apple: null, google: null, yandex: null, github: null },
  })
  @ApiProperty({
    description: 'Linked oauth accounts',
    example: { apple: null, google: 1239992, yandex: 20012, github: null },
  })
  linkedOAuth: {
    apple: unknown;
    google: unknown;
    yandex: unknown;
    github: unknown;
  };

  @Column('json', { default: { firstName: '', lastName: '' } })
  @ApiProperty({
    description: 'Full name',
    example: { firstName: 'Ivan', lastName: 'Petrov' },
  })
  name: {
    firstName: string;
    lastName: string;
  };

  @Column('json', {
    default: {
      ProjectManagement: 0,
      Backend: 0,
      Frontend: 0,
      MachineLearning: 0,
      DevOps: 0,
      QA: 0,
    },
  })
  @ApiProperty({
    description: 'Skills',
    example: {
      ProjectManagement: 2,
      Backend: 5,
      Frontend: 9,
      MachineLearning: 1,
      DevOps: 0,
      QA: 2,
    },
  })
  skills: {
    ProjectManagement: number;
    Backend: number;
    Frontend: number;
    MachineLearning: number;
    DevOps: number;
    QA: number;
  };

  @Column('json', { default: { github: null } })
  @ApiProperty({
    description: 'Social links',
    example: { github: 'https://github.com/Lon4ry' },
  })
  socialLinks: { github: string };

  @Column({ nullable: true })
  @ApiProperty({ description: 'Photo', example: faker.string.uuid() })
  photo: string;

  @Column({ enum: Gender })
  @ApiProperty({ description: 'Gender', enum: Gender })
  gender: string;

  @Column({ default: '' })
  @ApiProperty({ description: 'Status', example: 'I am a software developer' })
  status: string;

  @Column('json', {
    default: {
      isLoggedIn: false,
      lastLogin: null,
      history: [],
    },
  })
  @ApiProperty({
    description: 'Auth logs',
    example: { isLoggedIn: false, lastLogin: new Date(), history: [] },
  })
  authLogs: {
    isLoggedIn: boolean;
    lastLogin: Date;
    history: { ip: string; strategy: string; success: boolean; date: Date }[];
  };

  @OneToMany(() => NoticeEntity, (e) => e.user)
  @ApiHideProperty()
  notices: Relation<NoticeEntity[]>;

  @OneToMany(() => ProjectsToUsersEntity, (e) => e.project, { cascade: true })
  @ApiHideProperty()
  userToProjects: Relation<ProjectsToUsersEntity[]>;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Last update date', example: new Date() })
  updatedAt: Date;

  @CreateDateColumn({ update: false })
  @ApiProperty({
    description: 'Creation date',
    example: new Date(Date.now() - Math.random() * 10000000000),
  })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  // @BeforeInsert()
  // async parseUsername(): Promise<void> {
  //   this.username = this.username.toLowerCase();
  // }

  @AfterUpdate()
  async checkAuthLogs(): Promise<void> {
    const history = this.authLogs.history;
    if (history.length > 10)
      this.authLogs.history = history.slice(history.length - 10);
  }
}
