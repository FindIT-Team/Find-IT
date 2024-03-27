import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  StoreModuleAsyncOptions,
  StoreModuleOptions,
} from '../modules/store/store.module-options';

export default class StoreConfig {
  static getStoreConfig(configService: ConfigService): StoreModuleOptions {
    return {
      redis: {
        url: configService.get('STORE_URL'),
      },
    };
  }
}

export const StoreConfigAsync: StoreModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<StoreModuleOptions> => StoreConfig.getStoreConfig(configService),
  inject: [ConfigService],
};
