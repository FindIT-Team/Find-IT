import { ConfigurableModuleBuilder } from '@nestjs/common';
import { StoreModuleOptions } from './store.module-options';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<StoreModuleOptions>()
  .setFactoryMethodName('getStoreConfig')
  .setClassMethodName('forRoot')
  .build();
