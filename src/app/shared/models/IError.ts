import { AppSettings } from './../constants/appSettings';

import { ILogEntry } from '@pnp/logging';


export interface ISeqError {
  UserName: string;
  Application: string;
  AppComponenent: string;
  AppName: string;
  Description: string;
  ExceptionMessage: string;
  InnerExceptionMessage: string;
  Level: string;
  Method: string;
  Body: string;
  StatusCode: string;
  RawUrl: string;
  Environment: string;
  Headers: string;
  Title: string;
}

export class SeqError implements ISeqError {
  UserName: string = '';
  Application: string = '';
  AppComponenent: string = '';
  AppName: string = '';
  Description: string = '';
  ExceptionMessage: string = '';
  InnerExceptionMessage: string = '';
  Level: string = '';
  Method: string = '';
  Body: string = '';
  StatusCode: string = '';
  RawUrl: string = '';
  Environment: string = '';
  Headers: string = '';
  Title: string = '';

  constructor(entry: ILogEntry) {
    // this.UserName = ctx.currentUser.LoginName;
    this.AppName = AppSettings.appName;
    // this.AppComponenent = .appComponent ? entry.appComponent : '';
    this.Application = AppSettings.appUrl;
    this.Body = entry.message;
    this.InnerExceptionMessage = entry.data;
    // this.Level = LogLevel[entry.level.valueOf];
    // this.Environment = ctx.environment;
  }
}

/**
 * Interface of web operation results
 *
 * @export
 * * @extends {LogEntry}
 */
export interface LogEntryExtended extends ILogEntry {
  appComponent?: string;
  exception?: string;
  innnerException?: string;
}

