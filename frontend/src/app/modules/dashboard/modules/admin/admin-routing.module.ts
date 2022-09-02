import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@etp/shared/guards';
import { AdminComponent } from './admin.component';
import { VerificationsComponent } from './views';
import { ContactListComponent } from './views/contact-list/contact-list.component';
import { EventsComponent } from './views/events/events.component';
import { PanelComponent } from './views/panel/panel.component';
import { TypesComponent } from './views/types/types.component';
import { UsersComponent } from './views/users/users.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'panel',
        pathMatch: 'full'
      },
      { 
        path: 'panel', 
        component: PanelComponent, 
        canActivate:[AdminGuard],
      },
      { 
        path: 'users', 
        component: UsersComponent, 
        canActivate:[AdminGuard],
      },
      { 
        path: 'events', 
        component: EventsComponent, 
        canActivate:[AdminGuard],
      },
      { 
        path: 'types', 
        component: TypesComponent, 
        canActivate:[AdminGuard],
      },
      { 
        path: 'verifications', 
        component: VerificationsComponent, 
        canActivate:[AdminGuard],
      },
      { 
        path: 'contact', 
        component: ContactListComponent, 
        canActivate:[AdminGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
