import { RedisClientOptions } from 'redis';
import { ModuleMetadata, Provider, Type } from '@nestjs/common';

export interface StoreModuleOptions {
  redis: RedisClientOptions;
}

export interface StoreOptionsFactory {
  getStoreConfig(): Promise<StoreModuleOptions> | StoreModuleOptions;
}

export interface StoreModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<StoreOptionsFactory>;
  useClass?: Type<StoreOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<StoreModuleOptions> | StoreModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}
