import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  {path: 'view', component: ViewComponent, data: {pageId: 'af1', menuId: 'af1'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GristerRoutingModule { }
