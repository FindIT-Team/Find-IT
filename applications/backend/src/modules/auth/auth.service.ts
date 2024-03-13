import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { Session } from 'express-session';
import { UsernameAvailableDto } from './dto/username-available.dto';
import { OAuth, Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { IDeserializedUser } from './user.interface';
import { Request } from 'express';
import { UserAuthenticatedDto } from './dto/user-authenticated.dto';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async isAuthenticated(req: Request): Promise<UserAuthenticatedDto> {
    return { isAuthenticated: req.user && req.isAuthenticated() };
  }

  async validate({
    uniq,
    password,
  }: AuthDto): Promise<IDeserializedUser | null> {
    const user = await this.databaseService.user.findFirst({
      where: {
        OR: [{ username: uniq }, { email: uniq }],
      },
      select: {
        id: true,
        subscription: true,
        password: true,
        role: true,
        // authLogs: true,
      },
    });

    if (!user) return null;

    let success = false;
    if (await compare(password, user.password)) success = true;

    // this.databaseService.user.update({
    //   where: { id: user.id },
    //   data: {},
    // });

    // TODO: Authentication logs

    // authLogs.history.push({
    //   ip: '',
    //   strategy: 'local',
    //   success,
    //   date: new Date(),
    // });

    return success ? user : null;
  }

  async oauthValidate(
    profile: Record<string, any>,
  ): Promise<{ type: string; payload: IDeserializedUser | unknown }> {
    let user: (IDeserializedUser & { oAuth: OAuth | null }) | null = null,
      formatted = null;

    const findUser = async (uniq: Prisma.OAuthWhereInput) =>
      await this.databaseService.user.findFirst({
        where: { OR: [{ email: profile.emails[0].value }, { oAuth: uniq }] },
        select: {
          id: true,
          subscription: true,
          oAuth: true,
          role: true,
          // authLogs: true,
        },
      });

    const updateOAuth = async (data: Prisma.OAuthUpdateInput) =>
      user &&
      (await this.databaseService.oAuth.update({
        where: { userId: user.id },
        data,
      }));

    switch (profile.provider) {
      case 'apple': {
        // TODO: Apple validating
        console.log(profile);
        break;
      }

      case 'google': {
        user = await findUser({ google: profile.id });

        if (!user?.oAuth?.google) await updateOAuth({ google: profile.id });

        formatted = {
          email: profile.emails[0].value,
          oAuth: { google: profile.id },
          name: {
            firstName: profile.name.givenName,
            lastname: profile.name.familyName,
          },
        };
        break;
      }
      case 'yandex': {
        user = await findUser({ yandex: profile.id });

        if (!user?.oAuth?.yandex) await updateOAuth({ yandex: profile.id });

        formatted = {
          email: profile.emails[0].value,
          oAuth: { yandex: profile.id },
          name: {
            firstName: profile.name.familyName,
            lastname: profile.name.givenName,
          },
          gender: profile.gender,
        };
        break;
      }
      case 'github': {
        // TODO: Parse profile
        console.log(profile);

        formatted = {
          username: profile.login,
          email: profile.email,
          oAuth: { github: profile.id },
        };
        break;
      }
    }

    if (user) {
      // user.authLogs.history.push({
      //   ip: '',
      //   strategy: profile.provider,
      //   success: true,
      //   date: new Date(),
      // });
    }

    return user
      ? { type: 'User', payload: user }
      : { type: 'DefaultRegistrationValues', payload: formatted };
  }

  async register(session: Session, registerDto: RegisterDto): Promise<void> {
    try {
      const parsedDto = {
        ...registerDto.user,
        password: await hash(registerDto.user.password, 10),
        profile: {
          create: {
            ...registerDto.profile,
            skills: { create: registerDto.skills },
          },
        },
        oAuth: { create: registerDto.oAuth ?? {} },
      };

      delete (parsedDto.profile.create as { name?: string }).name;

      const user = await this.databaseService.user.create({
        data: parsedDto,
      });

      Object.assign(session, {
        passport: {
          user: {
            id: user.id,
          },
        },
      });
    } catch (e) {
      throw new UnprocessableEntityException((e as Error).message);
    }
  }

  async login(
    userId: string,
    sessionId: string,
    sessions: Record<string, Array<string>>,
    // ip: string,
  ): Promise<void> {
    // const user = await this.databaseService.user.findFirst({
    //   where: { id: userId },
    //   select: {
    //     id: true,
    //     // authLogs: true
    //   },
    // });

    // const history = user.authLogs.history;
    // const i = history.lastIndexOf(history.findLast((h) => h.ip === ''));
    // if (i !== -1) history[i].ip = ip;
    //
    // user.authLogs = {
    //   ...user.authLogs,
    //   history,
    //   isLoggedIn: true,
    // };

    if (sessions[userId] && !sessions[userId].includes(sessionId))
      sessions[userId] = [...sessions[userId], sessionId];
    else sessions[userId] = [sessionId];
  }

  async logout(
    userId: string,
    sessionId: string,
    sessions: Record<string, Array<string>>,
  ): Promise<void> {
    // const user = await this.databaseService.user.findFirst({
    //   where: { id: userId },
    //   select: {
    //     id: true,
    //     // authLogs: true
    //   },
    // });

    sessions[userId] = sessions[userId].filter((id) => id !== sessionId);

    if (sessions[userId].length !== 0) return;

    // user.authLogs = {
    //   ...user.authLogs,
    //   isLoggedIn: false,
    //   lastLogin: new Date(),
    // };
  }

  async isUsernameAvailable(username: string): Promise<UsernameAvailableDto> {
    const user = await this.databaseService.user.findUnique({
      where: { username },
      select: { id: true },
    });
    return { isAvailable: !!user };
  }
}
