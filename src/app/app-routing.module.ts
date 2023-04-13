import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { GristerModule } from './pages/grister/grister.module';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'grister',
    loadChildren: () => import('./pages/grister/grister.module').then(m => m.GristerModule)
  },
  {
    path: 'grister2',
    loadChildren: () => import('./pages/grister2/grister2.module').then(m => m.Grister2Module)
  },
  {
    path: 'drag',
    loadChildren: () => import('./pages/drag-basic/drag-basic.module').then(m => m.DragBasicModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
