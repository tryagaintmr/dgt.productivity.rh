import { SeqError, LogEntryExtended } from '@app/shared/models';
import { Injectable, OnDestroy } from '@angular/core';
import {
  Logger, ILogEntry,
  ConsoleListener,
  LogLevel,
  ILogListener
} from '@pnp/logging';
import { SeqClientService } from './seq-client.service';

export class SeqListener implements ILogListener {

  constructor(private seqLog: SeqClientService) { }

  log(entry: ILogEntry): void {
    // We convert the error into a Seq formatted entry
    const seqError = new SeqError(entry);

    // log in SEQ
    this.seqLog.dispatch(seqError);
  }
}


@Injectable({
  providedIn: 'root'
})
export class LoggerService implements OnDestroy {
  public errorStack: string[] = [];
  appComponent: string = '';

  constructor(private seqLog: SeqClientService) {
    Logger.subscribe(new ConsoleListener());
    Logger.subscribe(new SeqListener(seqLog));
    Logger.activeLogLevel = LogLevel.Verbose;
  }

  ngOnDestroy() {
    Logger.clearSubscribers();
  }

  public log(message: string, level: LogLevel, url?: string, stack?: string) {
    const entry: LogEntryExtended = { level: LogLevel.Error,
                                      message: `${message}`,
                                      appComponent: `${this.appComponent}`,
                                      innnerException: JSON.stringify(this.errorStack)
                                    };
    if (level === LogLevel.Error) {
      this.errorStack.push(message); // store all errors for reports error
    }
    Logger.log(entry);
    // this.LogInULS(message);
    // this.LogInSeq(message);
    // console.log(message);
  }

  public warning(message: string, level: LogLevel) {
    const entry: LogEntryExtended = {
                                      level: LogLevel.Warning,
                                      message: `${message}`,
                                      appComponent: `${this.appComponent}`,
      innnerException: JSON.stringify(this.errorStack)
    };
    if (level === LogLevel.Error) {
      this.errorStack.push(message); // store all errors for reports error
    }
    Logger.log(entry);
    // this.LogInULS(message);
    // this.LogInSeq(message);
    // console.log(message);
  }

  public error(message: string, level: LogLevel, exception: any, innerexception: any) {
    const entry: LogEntryExtended = {
                                      level: LogLevel.Error,
                                      message: `${message}`,
                                      appComponent: `${this.appComponent}`,
                                      innnerException: JSON.stringify(this.errorStack)
                                  };
    if (level === LogLevel.Error) {
      this.errorStack.push(message); // store all errors for reports error
    }
    Logger.log(entry);
  }

  public info(message: string) {
    const entry: LogEntryExtended = {
                                      level: LogLevel.Info,
                                      message: `${message}`,
                                      appComponent: `${this.appComponent}`,
                                  };

    Logger.log(entry);

  }
}


