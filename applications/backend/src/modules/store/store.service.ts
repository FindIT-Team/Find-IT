import { Inject, Injectable } from '@nestjs/common';
import RedisStore from 'connect-redis';
import { createClient, RedisClientType, RedisDefaultModules } from 'redis';
import { StoreModuleOptions } from './store.module-options';
import { RedisFunctions, RedisModules, RedisScripts } from '@redis/client';
import { MODULE_OPTIONS_TOKEN } from './store.module-definitions';

@Injectable()
export class StoreService {
  private readonly _connection: RedisClientType<
    RedisDefaultModules & RedisModules,
    RedisFunctions,
    RedisScripts
  >;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: StoreModuleOptions,
  ) {
    this._connection = createClient(options.redis);
    this._connection.connect().then();
  }

  private _websocketSessions: Record<string, string[]>;

  get websocketSessions(): Record<string, string[]> {
    if (!this._websocketSessions) {
      this._websocketSessions = {};
    }
    return this._websocketSessions;
  }

  private _session: RedisStore;

  get session(): RedisStore {
    if (!this._session) {
      this._session = new RedisStore({
        client: this._connection,
      });
    }
    return this._session;
  }
}
