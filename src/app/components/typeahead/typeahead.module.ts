import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TypeaheadComponent } from './typeahead.component';

@NgModule({
  declarations: [
    TypeaheadComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    TypeaheadComponent
  ]
})
export class TypeaheadModule { }
