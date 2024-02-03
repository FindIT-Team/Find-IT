import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './store.module-definitions';
import { StoreService } from './store.service';

@Global()
@Module({
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule extends ConfigurableModuleClass {
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    return super.forRoot(options);
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return super.forRootAsync(options);
  }
}
