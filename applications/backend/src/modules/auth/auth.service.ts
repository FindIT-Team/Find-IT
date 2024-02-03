import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from '../../entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { FindOneOptions } from 'typeorm';
import { Session } from 'express-session';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate({ uniq, password }: AuthDto): Promise<UserEntity> {
    const user = await this.usersService.findOne({
      where: [{ username: uniq }, { email: uniq }],
      select: [
        'id',
        'role',
        'subscription',
        'username',
        'password',
        'authLogs',
      ],
    });

    if (!user) return null;

    let success = false;
    if (await compare(password, user.password)) success = true;
    user.authLogs.history.push({
      ip: '',
      strategy: 'local',
      success,
      date: new Date(),
    });

    await user.save();

    return success ? user : null;
  }

  async oauthValidate(
    profile: Record<string, any>,
  ): Promise<{ type: string; payload: unknown }> {
    const findUser = async (where?: FindOneOptions<UserEntity>['where']) => {
      return await this.usersService.findOne({
        where,
        select: [
          'id',
          'role',
          'subscription',
          'username',
          'linkedOAuth',
          'authLogs',
        ],
      });
    };

    let user = null;
    let formatted = null;

    switch (profile.provider) {
      case 'apple': {
        // TODO: Apple validating
        console.log(profile);
        break;
      }

      case 'google': {
        user = findUser([
          { linkedOAuth: { google: profile.id } },
          { email: profile.emails[0].value },
        ]);

        if (user && !user.linkedOAuth.google)
          user.linkedOAuth.google = profile.id;

        formatted = {
          email: profile.emails[0].value,
          linkedOAuth: { google: profile.id },
          name: {
            firstName: profile.name.givenName,
            lastname: profile.name.familyName,
          },
        };
        break;
      }
      case 'yandex': {
        user = findUser([
          { linkedOAuth: { yandex: profile.id } },
          { email: profile.emails[0].value },
        ]);

        if (user && !user.linkedOAuth.yandex)
          user.linkedOAuth.yandex = profile.id;

        formatted = {
          email: profile.emails[0].value,
          linkedOAuth: { yandex: profile.id },
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
          linkedOAuth: { github: profile.id },
        };
        break;
      }
    }

    if (user) {
      user.authLogs.history.push({
        ip: '',
        strategy: profile.provider,
        success: true,
        date: new Date(),
      });
      user.save();
      delete user.password;
    }

    return user
      ? { type: 'User', payload: user }
      : { type: 'DefaultRegistrationValues', payload: formatted };
  }

  async register(registerDto: RegisterDto, session: Session): Promise<void> {
    const user: UserEntity = await this.usersService.create(registerDto);

    session['passport'] = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        subscription: user.subscription,
      },
    };
  }

  async login(
    userId: string,
    sessionId: string,
    sessions: Record<string, Array<string>>,
    ip: string,
  ): Promise<void> {
    const user: UserEntity = await this.usersService.findOne({
      where: { id: userId },
      select: ['id', 'authLogs'],
    });

    const history = user.authLogs.history;
    const i = history.lastIndexOf(history.findLast((h) => h.ip === ''));
    if (i !== -1) history[i].ip = ip;

    user.authLogs = {
      ...user.authLogs,
      history,
      isLoggedIn: true,
    };

    if (sessions[userId] && !sessions[userId].includes(sessionId))
      sessions[userId] = [...sessions[userId], sessionId];
    else sessions[userId] = [sessionId];

    await user.save();
  }

  async logout(
    userId: string,
    sessionId: string,
    sessions: Record<string, Array<string>>,
  ): Promise<void> {
    const user: UserEntity = await this.usersService.findOne({
      where: { id: userId },
      select: ['id', 'authLogs'],
    });

    sessions[userId] = sessions[userId].filter((id) => id !== sessionId);

    if (sessions[userId].length !== 0) return;

    user.authLogs = {
      ...user.authLogs,
      isLoggedIn: false,
      lastLogin: new Date(),
    };

    await user.save();
  }
}
