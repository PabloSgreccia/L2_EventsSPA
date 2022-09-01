import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PanelComponent } from './views/panel/panel.component';
import { EventsComponent } from './views/events/events.component';
import { TypesComponent } from './views/types/types.component';
import { UsersComponent } from './views/users/users.component';
import { VerificationsComponent } from './views/verifications/verifications.component';


@NgModule({
  declarations: [
    AdminComponent,
    PanelComponent,
    EventsComponent,
    TypesComponent,
    UsersComponent,
    VerificationsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
