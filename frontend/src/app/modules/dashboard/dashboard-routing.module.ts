import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { AuthGuard } from '@etp/shared/guards';
// Components
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    canActivate:[AuthGuard],
    component: DashboardComponent 
  },{ 
    path: 'main', 
    canActivate:[AuthGuard],
    component: DashboardComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
