import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '@app/app-routing.module';



@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
  ],
  exports : [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: []
})
export class CoreModule { }
