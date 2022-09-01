import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule, MaterialModule } from '@etp/shared/modules';
// Components
import { AuthComponent } from './auth.component';
// Views
import { LoginComponent, SignupComponent } from "src/app/modules/auth/components";
import { SignmenuComponent } from './views/signmenu/signmenu.component';


const views = [
  LoginComponent,
  SignupComponent,
]

@NgModule({
  declarations: [
    AuthComponent,
    ...views,
    SignmenuComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ComponentsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
