import { LoggerService } from '@app/shared/services/logger/logger.service';
import { Injectable } from '@angular/core';

// rxjs
import { ISPContext, ISPUser } from '@app/shared/models';
import { AppSettings, Environments } from '@app/shared/constants/appSettings';
import { UrlHelper } from '../common/urlHelper';
import * as $ from 'jquery';
import { LogLevel } from '@pnp/logging';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
/**
 * Global application settings.
 * The context is loaded on app startup to read ans store the initial query string values : hostUrl and AddinUrl
 *
 * @export
 */
@Injectable({
  providedIn: 'root'
})
export class ContextService {
  /**
   * The context object containing app web URL, host web URL, context information, and current user information.
   */
  public context: ISPContext = {
    appwebUrl: '',
    hostWebUrl: '',
    contextInfo: {},
    currentUser: {
      IsDsiAgent: false,
      IsSiteAdmin: false,
    }
  };

  /**
   * A BehaviorSubject to track the current user's DSI agent status.
   */
  public IsDsiAgent = new BehaviorSubject<boolean>(false);

  /**
   * A BehaviorSubject to track the current user's site admin status.
   */
  public IsSiteAdmin = new BehaviorSubject<boolean>(false);

  constructor(public logger: LoggerService) {
    logger.appComponent = 'SPContextService';
    sp.setup(AppSettings.pnpConfig);
  }

  /**
   * Loads the SharePoint context information, sets up PnPjs, and caches user information.
   * @returns A promise that resolves to an ISPContext object.
   */
  async load(): Promise<ISPContext> {
    try {
      console.log('loading context');
      // load and store query string information : hostUrl and AddinUrl and currentUser
      this.getAppWebUrl(); // fetch AppWeb and cache it
      this.getHostWebUrl(); // fetch HostWeb and cache it

      // setup pnp queries
      console.log('AppSettings :', AppSettings.pnpConfig);
      sp.setup(AppSettings.pnpConfig);

      // get environment : dev, staging, or production
      this.context.environment = this.getEnvironment();

      // load essential data
      await this.getCurrentUser(); // fetch current user and cache it

      // load non-essential data later, after the app has started
      setTimeout(() => {
        this.loadNonEssentialData();
      }, 0);

      return Promise.resolve(this.context);
    } catch (ex) {
      throw ex;
    }
  }

  async loadNonEssentialData(): Promise<void> {
    try {
      if(environment.useVaubanRoles)
        await this.getUserRoles();

      // reload digest value every 30sec (expiration is context.contextInfo.FormDigestTimeoutValue)
      setInterval(() => this.loadContextInfo(), 600000);
    } catch (error) {
      console.error('Error loading non-essential data:', error);
    }
  }

   /**
   * Refreshes the context information by requesting it from the SharePoint site.
   */
  loadContextInfo() {
    console.log('request contextInfo refresh...');
    sp.site.getContextInfo().then((contextInfo: any) => {
      console.log('context refreshed!', contextInfo);
      this.context.contextInfo = contextInfo;
    });
  }

  /**
   * Retrieves the app web URL from the query string and stores it in the context object.
   */
  public getAppWebUrl() {
    this.context.appwebUrl = UrlHelper.getUrlParamByName(AppSettings.appWebUrlParam);
    console.log('appwebUrl', this.context.appwebUrl);
  }

  /**
   * Retrieves the host web URL from the query string and stores it in the context object.
   * In non-production environments, the host web URL is set to the default proxy URL.
   */
  public getHostWebUrl() {
    this.context.hostWebUrl = UrlHelper.getUrlParamByName(AppSettings.hostWebUrlParam);
   if(!environment.production) {
     this.context.hostWebUrl = AppSettings.devEnvDefaultProxyUrl;
   }

    console.log('hostWebUrl', this.context.hostWebUrl);

  }

  // TODO : magic strings in appsettings
  public async getCurrentUser() {
    try {
      this.context.currentUser = await sp.web.get();
      console.log('current user', this.context.currentUser);
    // this.context.currentUser.IsDsiAgent = true;
    // tslint:disable-next-line:max-line-length

    } catch (ex) {
      console.log('User profile service unvailable');
      //this?.context?.currentUser?.IsDsiAgent = this.context?.currentUser?.IsSiteAdmin;
    }

  }

  /**
   * Fetches and stores the current user information in the context object.
   * In case of an error, the user's DSI agent status is set to their site admin status.
   */
  public async getOrganization() {
    try {
      const department = '';
      // const department = await sp.profiles.getUserProfilePropertyFor(this.context.currentUser.LoginName, 'Office');
      // this.context.currentUser.IsDsiAgent = department === 'SG/DSI' ? true : false;
      // this.IsDsiAgent.next(this.context.currentUser.IsDsiAgent);
      // console.log('department', department);
      return department;
    } catch(err) {
      console.error(err);
    } finally{
      return '';
    }
  }

  /**
   * Fetches and sets the current user's roles (DSI agent and site admin) in the context object.
   */
  public async getUserRoles() {
    this.getUserOrganization().then((department) => {
      const isDsi = department === 'SG\/DSI' ? true : false;
      if(this.context.currentUser)
        this.context.currentUser.IsDsiAgent = isDsi;
      this.IsDsiAgent.next(isDsi);
    // this.context.currentUser.IsDsiAgent = this.context.currentUser.IsSiteAdmin;
    console.log('profile department', department);
    if(this.context.currentUser)
      console.log('is DSI? ', this.context.currentUser.IsDsiAgent);
    });
    this.isUserSiteColAdmin().then((isAdmin) => {
      if(this.context.currentUser)
        this.context.currentUser.IsSiteAdmin = isAdmin;
      this.IsSiteAdmin.next(isAdmin);
      console.log('Is admin', isAdmin);
    });

  }

  /**
   * Checks if the current user is a site collection administrator.
   * @returns {Promise<any>} A promise resolving to a boolean value indicating whether the user is a site collection administrator.
   */
  public async isUserSiteColAdmin(): Promise<any> {
    try {
        let url = `${this.context.hostWebUrl}${AppSettings.userIsAdminServiceEndpointUrl}`;
        return $.ajax({
            crossDomain: true,
            xhrFields: {
                'withCredentials': true
            },
            url: url,
            method: "GET",
            headers: { "Accept": "application/json; odata=nometadata" },
            success: function (data) {
                console.log('data', data);
                return data;

            },
            error: function (data) {
                console.log("Error: ", data);
            }
        });

    } catch (ex: any) {
        this.logger.log(ex, LogLevel.Error);
    }
}

 /**
   * Fetches and returns the current user's organization. Time consuming process (SharePoint Soap endpoint call Vauban.API).
   * @returns {Promise<any>} A promise resolving to a string value representing the user's organization.
   */
  public async getUserOrganization(): Promise<any> {
    try {
        let url = `${this.context.hostWebUrl}${AppSettings.userOrganizationServiceEndpointUrl}`;
        return $.ajax({
            crossDomain: true,
            xhrFields: {
                'withCredentials': true
            },
            url: url,
            method: "GET",
            headers: { "Accept": "application/json; odata=nometadata" },
            // success: function (data) {
            //     console.log('data', data);
            //     return data;

            // },
            // error: function (data) {
            //     console.log("Error: ", data);
            // }
        });

    } catch (ex: any) {
        this.logger.log(ex, LogLevel.Error);
    }
}

/**
   * Retrieves the current SharePoint web.
   * @returns {Promise<Web>} A promise resolving to the current SharePoint web.
   */
  public getCurrentWeb() {
    return sp.web.get();
  }

  /**
   * Returns the current environment used in logging.
   * @returns {string} Environment (Prod, Staging, int, or dev).
   */
  public getEnvironment(): string {
    console.log('getting current env...');
    if (UrlHelper.isInHostHeader('dgtresor.gouv.fr')) {
      return Environments.prod;
    }

    if (UrlHelper.isInHostHeader('.staging.dgtresor.fr')) {
      return Environments.preprod;
    }

    if (UrlHelper.isInHostHeader('.dev.dgtresor.gouv.fr')) {
      return Environments.inte;
    }

    return Environments.dev;
  }
}



