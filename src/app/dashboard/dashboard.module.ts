import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { UserCardComponent } from './user-card/user-card.component';
import { TabsComponent } from '../components/tabs/tabs.component';
import { TabComponent } from '../components/tabs/tab.component';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../shared.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LastUpdatePipe } from './pipes/last-update.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { NamePipe } from './pipes/name.pipe';
import { BalancePipe } from './pipes/balance.pipe';

const routes: Routes = [
  { path: '', component: DashboardComponent },
]

@NgModule({
  declarations: [
    DashboardComponent, 
    UserCardComponent,
    TabsComponent,
    TabComponent,
    UserListComponent,
    EditUserComponent,
    LastUpdatePipe,
    StatusPipe,
    NamePipe,
    BalancePipe,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DashboardModule { }
