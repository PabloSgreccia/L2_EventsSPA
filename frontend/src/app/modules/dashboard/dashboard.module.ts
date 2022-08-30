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


@NgModule({
  declarations: [
    DashboardComponent,
    FeedComponent,
    EventComponent,
    NewEventComponent
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
