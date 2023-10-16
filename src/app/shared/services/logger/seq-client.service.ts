import { AppSettings } from '@app/shared/constants/appSettings';
import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { ISeqError } from '@app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class SeqClientService {

  constructor() { }

  dispatch(error: ISeqError) {
    try {
        // return $.ajax({
        // crossDomain: true,
        // xhrFields: {
        //   withCredentials: true
        // },
        // url: environment.devWebServiceDefaultBaseUrl + AppSettings.seqServiceEndpointUrl,
        // data: JSON.stringify(error),
        // method: 'POST',
        // contentType: 'application/json',
        // headers: {
        //   'Accept': 'application/json;odata=verbose',
        //   'content-type': 'application/json;odata=verbose',
        //   'X-RequestDigest': $('#__REQUESTDIGEST').val()
        // },
        // success(data) {
        //   console.log('seq dispatch success', data);
        //   return true;

        // },
        // error(data) {
        //   console.log('Error: ', data);
        // }
      //});
    } catch {
      console.log('cannot contact seq server!')
    }

  }
}
