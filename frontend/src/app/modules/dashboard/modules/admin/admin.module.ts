import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PanelComponent } from './views/panel/panel.component';
import { EventsComponent } from './views/events/events.component';
import { TypesComponent } from './views/types/types.component';
import { UsersComponent } from './views/users/users.component';
import { VerificationsComponent } from './views/verifications/verifications.component';
import { MaterialModule } from '@etp/shared/modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactListComponent } from './views/contact-list/contact-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    PanelComponent,
    EventsComponent,
    TypesComponent,
    UsersComponent,
    VerificationsComponent,
    ContactListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
