import { sp } from "@pnp/sp";
import { Web, IWeb } from "@pnp/sp/webs";
import { ISPUser } from './index';



export interface ISPContext {
  currentUser?: ISPUser;
  appwebUrl?: string;
  hostWebUrl?: string;
  web?: IWeb;
  environment?: string;
  contextInfo?: any;
  LoginName?:any;
}

export class SPContext implements ISPContext {
  currentUser?: ISPUser;
  appwebUrl?: string;
  hostWebUrl?: string;
  web?: IWeb;
  environment?: string;
  contextInfo?: any;

  // tslint:disable-next-line:variable-name
  constructor(_appWebUrl?: string, _hostWebUrl?: string, _currentUser?: ISPUser, _web?: IWeb, _env?: string) {
    this.appwebUrl = _appWebUrl;
    this.hostWebUrl = _hostWebUrl;
    this.currentUser = _currentUser;
    this.web = _web;
    this.environment = _env;
    this.contextInfo = {};
  }
}
