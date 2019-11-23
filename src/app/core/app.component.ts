import { Component } from '@angular/core';

import { LoggingService } from '../shared/services/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-app';

  constructor(private logger: LoggingService) {

    this.logger.info(this, 'Calling constructor');
  }
}
