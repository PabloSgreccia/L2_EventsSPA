import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Guards
import { AuthGuard } from '@etp/shared/guards';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { NewEventComponent } from './components/new-event/new-event.component';
// Components
import { DashboardComponent } from './dashboard.component';
import { FeedComponent } from './views';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'feed',
    pathMatch: 'full'
  },{ 
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
    component: DashboardComponent,
    canActivate:[AuthGuard],
  },{ 
    path: 'event/:id', 
    component: EventDetailComponent,
    canActivate:[AuthGuard],
  },{ 
    path: 'about', 
    component: DashboardComponent,
  },{ 
    path: 'contact', 
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
