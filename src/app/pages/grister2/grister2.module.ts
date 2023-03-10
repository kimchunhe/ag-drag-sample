import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Grister2RoutingModule } from './grister2-routing.module';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    Grister2RoutingModule
  ]
})
export class Grister2Module { }
