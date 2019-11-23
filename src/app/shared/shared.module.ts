import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { LoggingService } from './services/logging.service';
import { MockLoggingService } from './services/mock-logging.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        LoggingService,
        MockLoggingService
      ]
    };
  }
}
