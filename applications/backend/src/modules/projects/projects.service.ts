import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity } from '../../entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto & {
      projectToUsers: [{ user: UserEntity }];
    },
  ): Promise<ProjectEntity> {
    try {
      return await this.projectsRepository
        .create({
          ...createProjectDto,
          projectToUsers: [
            {
              user: createProjectDto.projectToUsers[0].user,
              isOwner: true,
              status: 'userJoined',
              permissions: [],
            },
          ],
        })
        .save();
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto & {
      projectToUsers: [{ user?: UserEntity }];
    },
  ): Promise<ProjectEntity> {
    const project: ProjectEntity = await this.findOne({
      where: {
        id,
        projectToUsers: {
          user: updateProjectDto.projectToUsers[0].user,
          isOwner: true,
        },
      },
      select: ['id'],
    });

    try {
      Object.assign(project, updateProjectDto);
      Object.assign(project, await project.save());
    } catch (err) {
      throw new UnprocessableEntityException(updateProjectDto, err);
    }

    return project;
  }

  async remove(id: string, user?: UserEntity): Promise<ProjectEntity> {
    const project: ProjectEntity = await this.findOne({
      where: { id, projectToUsers: { user, isOwner: true } },
      select: ['id'],
    });

    try {
      await this.projectsRepository.remove(project);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    return project;
  }

  async findOne(
    options?: FindOneOptions<ProjectEntity>,
  ): Promise<ProjectEntity> {
    try {
      return await this.projectsRepository.findOne(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async count(options?: FindManyOptions<ProjectEntity>): Promise<number> {
    try {
      return await this.projectsRepository.count(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async find(
    options?: FindManyOptions<ProjectEntity>,
  ): Promise<ProjectEntity[]> {
    try {
      return await this.projectsRepository.find(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
