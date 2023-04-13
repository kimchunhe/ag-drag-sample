import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragBasicRoutingModule } from './drag-basic-routing.module';
import { EditComponent } from './edit/edit.component';
import {DragDropModule} from '@angular/cdk/drag-drop'


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    DragBasicRoutingModule,
    DragDropModule,
  ]
})
export class DragBasicModule { }
