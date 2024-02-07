import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { websocketConfig } from '../../configs/websocket.config';
import { Server } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { StoreService } from '../store/store.service';
import { gatewayInit } from '../../utils/gateway-init.util';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from '../../entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../../decorators/websocket/user.decorator';
import { UserEntity } from '../../entities/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

@WebSocketGateway(websocketConfig('projects'))
export class ProjectsGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  constructor(
    private readonly configService: ConfigService,
    private readonly storeService: StoreService,
    private readonly projectsService: ProjectsService,
  ) {}

  afterInit(server: Server) {
    gatewayInit(
      server,
      this.storeService.session,
      this.configService.get('SECRET'),
    );
  }

  @SubscribeMessage('createProject')
  async createProject(
    @User() user: UserEntity,
    @MessageBody() createProjectDto: CreateProjectDto,
  ): Promise<{ event: string; project: ProjectEntity }> {
    return {
      event: 'createProject',
      project: await this.projectsService.create({
        ...createProjectDto,
        projectToUsers: [{ user: user }],
      }),
    };
  }

  @SubscribeMessage('updateProject')
  async updateProject(
    @User() user: UserEntity,
    @MessageBody() id: string,
    @MessageBody() updateProjectDto: UpdateProjectDto,
  ): Promise<{ event: string; project: ProjectEntity }> {
    return {
      event: 'updateProject',
      project: await this.projectsService.update(id, {
        ...updateProjectDto,
        projectToUsers: [{ user }],
      }),
    };
  }

  @SubscribeMessage('getProjects')
  async getProjects(@MessageBody() data: unknown) {
    const { take, skip } = data as { take: number; skip: number };
    const projects: ProjectEntity[] = await this.projectsService.find({
      order: { updatedAt: 'DESC' },
      take,
      skip,
    });

    return {
      event: 'getProjects',
      isDataSent: projects.map((project) =>
        this.server.emit('getProjects', project),
      ),
    };
  }
}
