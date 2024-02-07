import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateProjectToUserDto } from './dto/create-project-to-user.dto';
import { ProjectsToUsersEntity } from '../../entities/projects-to-users.entity';
import { UpdateProjectToUserDto } from './dto/update-project-to-user.dto';
import { ProjectEntity } from '../../entities/project.entity';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class ProjectsToUsersService {
  constructor(
    @InjectRepository(ProjectsToUsersEntity)
    private readonly projectsToUsersRepository: Repository<ProjectsToUsersEntity>,
  ) {}

  async create(
    createProjectToUserDto: CreateProjectToUserDto & {
      user: UserEntity;
      project: ProjectEntity;
    },
  ): Promise<ProjectsToUsersEntity> {
    try {
      return await this.projectsToUsersRepository
        .create(createProjectToUserDto)
        .save();
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async update(
    id: string,
    updateProjectToUserDto: UpdateProjectToUserDto & { user?: UserEntity },
  ): Promise<ProjectsToUsersEntity> {
    const projectToUser: ProjectsToUsersEntity =
      await this.projectsToUsersRepository.findOne({
        where: { id, user: updateProjectToUserDto.user },
        select: ['id'],
      });

    try {
      Object.assign(projectToUser, updateProjectToUserDto);
      Object.assign(projectToUser, await projectToUser.save());
    } catch (err) {
      throw new UnprocessableEntityException(updateProjectToUserDto, err);
    }

    return projectToUser;
  }

  async remove(id: string, user?: UserEntity): Promise<ProjectsToUsersEntity> {
    const projectToUser: ProjectsToUsersEntity =
      await this.projectsToUsersRepository.findOne({
        where: { id, user },
        select: ['id'],
      });

    try {
      await projectToUser.remove();
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }

    if (
      await this.projectsToUsersRepository.findOne({
        where: { id, user },
        select: ['id'],
      })
    ) {
      throw new UnprocessableEntityException();
    }

    return projectToUser;
  }

  async findOne(
    options?: FindOneOptions<ProjectsToUsersEntity>,
  ): Promise<ProjectsToUsersEntity> {
    try {
      return await this.projectsToUsersRepository.findOne(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async find(
    options?: FindManyOptions<ProjectsToUsersEntity>,
  ): Promise<ProjectsToUsersEntity[]> {
    try {
      return await this.projectsToUsersRepository.find(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async count(
    options?: FindManyOptions<ProjectsToUsersEntity>,
  ): Promise<number> {
    try {
      return await this.projectsToUsersRepository.count(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
