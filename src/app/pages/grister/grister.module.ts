import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GristerRoutingModule } from './grister-routing.module';
import { GridsterModule } from 'angular-gridster2';
import { ViewComponent } from './view/view.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    GristerRoutingModule,
    GridsterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class GristerModule { }
