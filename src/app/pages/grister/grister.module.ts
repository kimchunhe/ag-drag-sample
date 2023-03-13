import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GristerRoutingModule } from './grister-routing.module';
import { GridsterModule } from 'angular-gridster2';
import { ViewComponent } from './view/view.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {NzSelectModule} from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    GristerRoutingModule,
    GridsterModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
  ]
})
export class GristerModule { }
