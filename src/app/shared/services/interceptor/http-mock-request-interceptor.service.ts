import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpClient } from '@angular/common/http';

const allWebs = [
    {
        url: 'https://jsonplaceholder.typicode.com/users',
        //json: db.webs
    },
    {
      url: 'http:// dev-sp2016-vs01:10000/_vti_bin/DgtSeqService/SeqService.svc/Logger',
      json: { }
    },
    {
      url : `http://localhost:8080/_api/SP.AppContextSite(@target)/web/webs/add?@target='http://dev-sp2016-vs01.dev.local:10000/com'`,
      //json: db.webs
    },
    {
      url : `http://dev-sp2016-vs01:10000/_api/web/currentuser`,
      json: {
        Title : 'Mohamed Mustapha',
        Id: 1
      }
    },
    {
      url : `http://localhost:8080/_api/web/currentuser`,
      json: {
        Title : 'Mohamed Mustapha',
        Id: 1
      }
    }
];


@Injectable({
  providedIn: 'root'
})
export class HttpMockRequestInterceptorService {

  constructor(private injector: Injector, private httpClient: HttpClient) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      for (const element of allWebs) {
        if (request.url === element.url) {
            console.log('Loaded from json : ' + request.url);
            return of(new HttpResponse({ status: 200, body: ((element.json) as any).default }));
        }
      }
      console.log('Intercepted httpCall' + request.url);
      return next.handle(request);
    }
}
