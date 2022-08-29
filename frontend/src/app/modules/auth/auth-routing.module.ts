import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AuthComponent } from './auth.component';
import { SignmenuComponent } from './components/signmenu/signmenu.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'signmenu', 
    pathMatch: 'full'
  },{
    path: 'signmenu',
    component: SignmenuComponent
  },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },{
  //   path: 'signup',
  //   component: SignupComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
