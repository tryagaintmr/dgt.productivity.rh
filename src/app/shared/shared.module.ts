import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { SharepointMultilinetextDirective } from './directives/sharepoint-multilinetext.directive';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatSelectModule} from '@angular/material/select';
// import {MatChipsModule} from '@angular/material/chips';
// import {MatButtonModule} from '@angular/material/button';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import {MatInputModule} from '@angular/material/input';
// import {MatExpansionModule} from '@angular/material/expansion';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatStepperModule} from '@angular/material/stepper';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatIconModule} from '@angular/material/icon';
// import {MatSliderModule} from '@angular/material/slider';
// import {MatCardModule} from '@angular/material/card';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatListModule} from '@angular/material/list';
// import {EnumToArrayPipe } from './pipes/enum-to-array.pipe';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [EnumToArrayPipe, SharepointMultilinetextDirective],
  imports: [
    CommonModule,
    // MatAutocompleteModule,
    // MatRadioModule,
    // MatSelectModule,
    // MatChipsModule,
    // MatButtonModule,
    // MatDialogModule,
    // MatButtonToggleModule,
    // MatInputModule,
    // MatExpansionModule,
    // MatProgressBarModule,
    // MatFormFieldModule,
    // MatSidenavModule,
    // MatSnackBarModule,
    // MatDialogModule,
    // MatStepperModule,
    // MatIconModule,
    // MatSliderModule,
    // MatCardModule,
    // MatListModule,
    // MatCheckboxModule,
    // MatSlideToggleModule
  ],
  exports: [
    CommonModule,
    // MatRadioModule,
    // MatSelectModule,
    // MatChipsModule,
    // MatButtonModule,
    // MatDialogModule,
    // MatButtonToggleModule,
    // MatInputModule,
    // MatListModule,
    // MatExpansionModule,
    // MatProgressBarModule,
    // MatFormFieldModule,
    // MatSnackBarModule,
    // MatStepperModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatAutocompleteModule,
    // MatSliderModule,
    // MatCardModule,
    // MatCheckboxModule,
    // EnumToArrayPipe,
    // MatSlideToggleModule
  ]
})
export class SharedModule { }
