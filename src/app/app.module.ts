
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContextService } from './shared/services/context.service';
import { APP_BASE_HREF } from '@angular/common';
import { GlobalErrorHandlerService } from './shared/services/logger/global-error-handler.service';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpMockRequestInterceptorService } from './shared/services/interceptor/http-mock-request-interceptor.service';
import { PageErrorComponent } from './shared/pages/page-error/page-error.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { environment } from '@/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { APP_INITIALIZER, ErrorHandler, NgModule, isDevMode } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { AuthConfigModule } from './auth/auth-config.module';


export const isMock = environment.mock;
export const isInSharePointContext = environment.useSharePointContext;
// tslint:disable-next-line: ban-types
export function startupServiceFactory(contextService: ContextService): Function {
  return async () => isInSharePointContext ? await contextService.load() : Promise.resolve(true);
}


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageErrorComponent
  ],
  imports: [
    CoreModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AuthConfigModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: isMock ? HttpMockRequestInterceptorService : HttpMockRequestInterceptorService,
      multi: true
    },
    {
      provide: APP_BASE_HREF, useValue: '.'
    },
    ContextService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [ContextService],
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
