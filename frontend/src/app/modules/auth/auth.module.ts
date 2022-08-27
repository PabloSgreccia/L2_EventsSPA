import { NgModule } from '@angular/core';
// Modules
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ComponentsModule, MaterialModule } from '@etp/shared/modules';
// Auth Components
import { AuthComponent } from './auth.component';
// Views
import { LoginComponent, SignupComponent } from "@etp/auth/views";

const views = [
  LoginComponent,
  SignupComponent,
]

@NgModule({
  declarations: [
    AuthComponent,
    ...views
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class AuthModule { }
