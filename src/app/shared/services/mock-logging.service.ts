import { Injectable } from '@angular/core';

import { ILoggingService } from './logging.service';

@Injectable()
export class MockLoggingService implements ILoggingService {

    public loggerName: string;
    traceLevel: number;
    debugLevel: number;
    infoLevel: number;
    warnLevel: number;
    errorLevel: number;
    fatalLevel: number;

    public trace(logObject: object | string, e?: any) {
    }
    public debug(logObject: object | string, e?: any) {
    }
    public info(logObject: object | string, e?: any) {
    }
    public warn(logObject: object | string, e?: any) {
    }
    public error(logObject: object | string, e?: any) {
    }
    public fatal(logObject: object | string, e?: any) {
    }
}
