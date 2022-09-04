import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { AuthGuard } from '@etp/shared/guards';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { NewEventComponent } from './views/new-event/new-event.component';
// Components
import { DashboardComponent } from './dashboard.component';
import { EventEditComponent, FeedComponent } from './views';
import { ProfileComponent } from './views/profile/profile.component';
import { SettingsComponent } from './views/settings/settings.component';
import { AdminGroupGuard } from './guards';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
      },
      { 
        path: 'feed', 
        component: FeedComponent, 
        canActivate:[AuthGuard],
      },{ 
        path: 'new-event', 
        component: NewEventComponent, 
        canActivate:[AuthGuard],
      },{ 
        path: 'profile/:id', 
        component: ProfileComponent,
        canActivate:[AuthGuard],
      },{ 
        path: 'settings', 
        component: SettingsComponent,
        canActivate:[AuthGuard],
      },{ 
        path: 'event/:id', 
        component: EventDetailComponent,
        canActivate:[AuthGuard],
      },{ 
        path: 'editevent/:id', 
        component: EventEditComponent,
        canActivate:[AdminGroupGuard],
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
