import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {path: 'edit', component: EditComponent, data: {pageId: 'af1', menuId: 'af1'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragBasicRoutingModule { }
