import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectsToProfiles } from './projects-to-profiles.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('simple-json')
  employersNeeds: {
    frontend: number;
    backend: number;
    test: number;
  };

  @Column({ nullable: true })
  budget: string;

  @OneToMany(() => ProjectsToProfiles, (e) => e.project)
  projectToProfiles: ProjectsToProfiles[];

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn({ update: false })
  createdAt: Date;
}