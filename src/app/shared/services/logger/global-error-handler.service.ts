import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { LoggerService } from './logger.service';
import { LogLevel } from '@pnp/logging';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
//import * as StackTrace from 'stacktrace-js';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any) {
    const loggerService = this.injector.get(LoggerService);
    const location = this.injector.get(LocationStrategy);
    const message = error.message ? error.message : error.toString();

    //
    const url = location instanceof PathLocationStrategy ? location.path() : '';

    // get the stack trace, lets grab the last 10 stacks only
    // StackTrace.fromError(error).then((stackframes : any) => {
    //   const stackString = stackframes
    //     .splice(0, 20)
    //     .map((sf: any) => {
    //       return sf.toString();
    //     }).join('\n');

    //     // log on the server
    //   loggerService.log(message, LogLevel.Error, url, stackString );
    // });

      // IMPORTANT: Rethrow the error otherwise it gets swallowed
    throw error;
    }
  }

