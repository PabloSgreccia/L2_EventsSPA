import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ComponentsModule } from 'src/app/shared/modules/components/components.module';
import { FeedComponent } from './views/feed/feed.component';
import { EventComponent } from './components/event/event.component';
import { MaterialModule } from '@etp/shared/modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewEventComponent } from './components/new-event/new-event.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ProfileComponent } from './views/profile/profile.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { SettingsComponent } from './views/settings/settings.component';
import { ModalToEditComponent } from './components/modal-to-edit/modal-to-edit.component';
import { ModalToChangePwdComponent } from './components/modal-to-change-pwd/modal-to-change-pwd.component';
import { ModalToChangePhotoComponent } from './components/modal-to-change-photo/modal-to-change-photo.component';
import { ModalMsgComponent } from './components/modal-msg/modal-msg.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FeedComponent,
    EventComponent,
    NewEventComponent,
    ProfileComponent,
    EventDetailComponent,
    SettingsComponent,
    ModalToEditComponent,
    ModalToChangePwdComponent,
    ModalToChangePhotoComponent,
    ModalMsgComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    // NgpImagePickerModule,
  ]
})
export class DashboardModule { }
