import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '@etp/shared/components';
import { AdminGuard, AuthGuard } from '@etp/shared/guards';
import { AboutComponent, ContactComponent } from '@etp/shared/views';



const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) 
  },
  { 
    path: 'dashboard', 
    canLoad:[AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { 
    path: 'admin', 
    canLoad:[AdminGuard],
    loadChildren: () => import('./modules/dashboard/modules/admin/admin.module').then(m => m.AdminModule) 
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
