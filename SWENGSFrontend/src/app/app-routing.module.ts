import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PostingComponent} from './posting/posting.component';
import {ProfileFormComponent} from './profile-form/profile-form.component';
import {AuthGuard} from './auth.guard';
import {ProfileResolver} from './resolver/profile.resolver';
import {ProfileComponent} from './profile/profile.component';
import {LogoutComponent} from './logout/logout.component';
import {ActivityOptionsResolver} from './resolver/activity-options.resolver';
import {WritePostingComponent} from './write-posting/write-posting.component';
import {CommunityComponent} from './community/community.component';
import {ProfilesResolver} from './resolver/profiles.resolver';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {
    path: 'posting',
    component: PostingComponent,
    resolve: {activityOptions: ActivityOptionsResolver}
  },
  {
    path: 'posting/write',
    component: WritePostingComponent,
    resolve: {activityOptions: ActivityOptionsResolver}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      profile: ProfileResolver
    },
  },
  {
    path: 'profile-form/:id',
    component: ProfileFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      profile: ProfileResolver
    }
  },
    {
    path: 'community',
    component: CommunityComponent,
    canActivate: [AuthGuard],
    resolve: {
      profiles: ProfilesResolver
    },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
