import { HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let commonLogMessage: string;

  beforeAll(() => {
    const clientUrl = 'http://localhost:9876/context.html';
    const { version: appVersion } = require('../../../../package.json');
    commonLogMessage = `; (appVersion: ${appVersion}, clientUrl: ${clientUrl})`;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpXhrBackend, useClass: HttpBackend },
        LoggingService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should create', inject([LoggingService], (service: LoggingService) => {
    expect(service).toBeTruthy();
  }));


  const logLevelTests = (level: string) => {
    describe(level.toLowerCase(), () => {
      let method: any;
      let message: string;

      beforeAll(() => {
        switch (level) {
          case 'DEBUG':
          case 'INFO':
            method = 'log';
            break;
          case 'WARN':
            method = 'warn';
            break;
          case 'ERROR':
          case 'FATAL':
            method = 'error';
            break;
        }
        message = level;
      });

      it('should call the logger with the correct method',
        inject([LoggingService], (service: LoggingService) => {

          // Arrange
          const logSpy = spyOn(window.console, method).and.stub();

          // Act
          service[level.toLocaleLowerCase()](message);

          // Assert
          expect(logSpy).toHaveBeenCalled();
        }));

      it('should call the logger with the correct message when message of type string',
        inject([LoggingService], (service: LoggingService) => {

          // Arrange
          const logSpy = spyOn(window.console, method).and.stub();

          // Act
          service[level.toLocaleLowerCase()]('LoggingTest', message);

          // Assert
          expect(logSpy).toHaveBeenCalledWith(`LoggingTest: ${message}${commonLogMessage}`);
        }));

      it('should call the logger with the correct message when message of type object',
        inject([LoggingService], (service: LoggingService) => {

          // Arrange
          const additionalInfo = { message: 'additional info message' };
          const logSpy = spyOn(window.console, method).and.stub();

          // Act
          service[level.toLocaleLowerCase()]('LoggingTest', additionalInfo);

          // Assert
          expect(logSpy).toHaveBeenCalledWith(`LoggingTest: ${JSON.stringify(additionalInfo)}${commonLogMessage}`);
        }));

      it('should call the logger with the name of the object instance',
        inject([LoggingService], (service: LoggingService) => {

          // Arrange
          const logSpy = spyOn(window.console, method).and.stub();

          // Act
          service[level.toLocaleLowerCase()](this, message);

          // Assert
          expect(logSpy).toHaveBeenCalledWith(`: ${message}${commonLogMessage}`);
        }));
    });
  };

  logLevelTests('DEBUG');
  logLevelTests('INFO');
  logLevelTests('WARN');
  logLevelTests('ERROR');
  logLevelTests('FATAL');
});
