import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AuthComponent } from './auth.component';
import { SignmenuComponent } from './views/signmenu/signmenu.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'signmenu', 
    pathMatch: 'full'
  },{
    path: 'signmenu',
    component: SignmenuComponent
  },{
    path: 'signmenu/:success',
    component: SignmenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
