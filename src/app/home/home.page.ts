import { Component } from '@angular/core';
import { IDocument, Document } from './IInterfaces';
import { DocumentRespository } from './state.repository';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(public docRepo: DocumentRespository) {

  }


}
