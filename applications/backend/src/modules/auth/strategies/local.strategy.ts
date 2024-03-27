import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { IDeserializedUser } from '../user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'uniq' });
  }

  async validate(
    uniq: string,
    password: string,
  ): Promise<IDeserializedUser | null> {
    return await this.authService.validate({ uniq, password });
  }
}
