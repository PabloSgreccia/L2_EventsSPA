import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ComponentsModule } from 'src/app/shared/modules/components/components.module';
import { FeedComponent } from './views/feed/feed.component';
import { EventComponent } from './components/event/event.component';
import { MaterialModule } from '@etp/shared/modules';
import { NewEventComponent } from './views/new-event/new-event.component';
import { ProfileComponent } from './views/profile/profile.component';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { SettingsComponent } from './views/settings/settings.component';
import { ModalToEditComponent } from './components/modal-to-edit/modal-to-edit.component';
import { ModalToChangePwdComponent } from './components/modal-to-change-pwd/modal-to-change-pwd.component';
import { ModalToChangePhotoComponent } from './components/modal-to-change-photo/modal-to-change-photo.component';
import { ModalMsgComponent } from '../../shared/components/modal-msg/modal-msg.component';
import { EventEditComponent } from './views';
import { ModalToChangePhotoEventComponent } from './components/modal-to-change-photo-event/modal-to-change-photo-event.component';
import { ModalToChangePhotoTypeComponent } from './components/modal-to-change-photo-type/modal-to-change-photo-type.component';
import { ModalBeforeDeleteComponent } from './components/modal-before-delete/modal-before-delete.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FeedComponent,
    EventComponent,
    NewEventComponent,
    EventEditComponent,
    ProfileComponent,
    EventDetailComponent,
    SettingsComponent,
    ModalToEditComponent,
    ModalToChangePwdComponent,
    ModalToChangePhotoComponent,
    ModalMsgComponent,
    ModalToChangePhotoEventComponent,
    ModalToChangePhotoTypeComponent,
    ModalBeforeDeleteComponent,
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
