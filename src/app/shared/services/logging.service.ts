import { Injectable } from '@angular/core';

import { ClassUtilities } from '../helpers/class-utilities';
import { application } from './../../../environments/application';
import { environment } from './../../../environments/environment';

const getLogLevel = (logLevel: string): number => {

    switch (logLevel) {
        case 'ALL':
            return 1;
        case 'DEBUG':
            return 2000;
        case 'INFO':
            return 3000;
        case 'WARN':
            return 4000;
        case 'ERROR':
            return 5000;
        case 'FATAL':
            return 6000;
        case 'OFF':
            return 0;
        default:
            return 1;
    }
};

export interface ILoggingService {
    debug(logObject: object | string, e?: any): void;
    info(logObject: object | string, e?: any): void;
    warn(logObject: object | string, e?: any): void;
    error(logObject: object | string, e?: any): void;
    fatal(logObject: object | string, e?: any): void;
}

@Injectable()
export class LoggingService implements ILoggingService {
    debugLevel: number;
    infoLevel: number;
    warnLevel: number;
    errorLevel: number;
    fatalLevel: number;

    constructor() {
        this.configure();
    }

    private configure() {
        this.debugLevel = getLogLevel('DEBUG');
        this.infoLevel = getLogLevel('INFO');
        this.warnLevel = getLogLevel('WARN');
        this.errorLevel = getLogLevel('ERROR');
        this.fatalLevel = getLogLevel('FATAL');
    }
    public debug(logger: any, logObject: object | string): void {
        this.log(logger, this.debugLevel, logObject);
    }
    public info(logger: any, logObject: object | string): void {
        this.log(logger, this.infoLevel, logObject);
    }
    public warn(logger: any, logObject: object | string): void {
        this.log(logger, this.warnLevel, logObject);
    }
    public error(logger: any, logObject: object | string): void {
        this.log(logger, this.errorLevel, logObject);
    }
    public fatal(logger: any, logObject: object | string): void {
        this.log(logger, this.fatalLevel, logObject);
    }

    private getLoggerName = (logger: any): string => {
        let loggerName = '';
        if (logger) {
            if (typeof logger === 'string') {
                loggerName = logger;
            } else {
                loggerName = ClassUtilities.getClassNameFor(logger);
            }
        }
        return loggerName;
    }

    private log = (logger: any, level: number, logObject: object | string): void => {
        const loggerName = this.getLoggerName(logger);

        if (typeof logObject === 'string') {
            logObject = `${loggerName}: ${logObject}; (appVersion: ${application.version}, clientUrl: ${location.href})`;
        } else if (typeof logObject === 'object') {
            logObject = `${loggerName}: ${JSON.stringify(logObject)}; (appVersion: ${application.version}, clientUrl: ${location.href})`;
        }

        const logLevel = getLogLevel(environment.logLevel);

        if (logLevel === 0 || level < logLevel) {
            return;
        }

        switch (level) {
            case this.debugLevel:
            case this.infoLevel:
                // tslint:disable-next-line:no-console
                console.log(`${logObject}`);
                break;
            case this.warnLevel:
                // tslint:disable-next-line:no-console
                console.warn(`${logObject}`);
                break;
            case this.errorLevel:
            case this.fatalLevel:
                // tslint:disable-next-line:no-console
                console.error(`${logObject}`);
                break;

        }
    }
}
