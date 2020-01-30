import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PostingComponent} from './posting/posting.component';
import {ProfileFormComponent} from './profile-form/profile-form.component';
import {AuthGuard} from './auth.guard';
import {ProfileResolver} from './resolver/profile.resolver';
import {LogoutComponent} from './logout/logout.component';
import {ActivityOptionsResolver} from './resolver/activity-options.resolver';
import {WritePostingComponent} from './write-posting/write-posting.component';
import {CommunityComponent} from './community/community.component';
import {ProfilesResolver} from './resolver/profiles.resolver';
import {WriteMailComponent} from './write-mail/write-mail.component';
import {ProfileDetailComponent} from './profile-detail/profile-detail.component';
import {FollowersComponent} from './followers/followers.component';
import {FollowingsComponent} from './followings/followings.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login', component: LoginComponent
  },
  {path: 'logout', component: LogoutComponent},
  {
    path: 'posting/:all',
    component: PostingComponent,
    resolve: {activityOptions: ActivityOptionsResolver},
    runGuardsAndResolvers: 'paramsChange',
  },
  {
    path: 'posting',
    component: PostingComponent,
    resolve: {activityOptions: ActivityOptionsResolver},
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'posting/write',
    component: WritePostingComponent,
    resolve: {activityOptions: ActivityOptionsResolver}
  },
  {
    path: 'profile/:id',
    component: ProfileDetailComponent,
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
    }
  },
  {
    path: 'followers/:id',
    component: FollowersComponent,
    canActivate: [AuthGuard],
    resolve: {
      profile: ProfileResolver
    }
  }, {
    path: 'followings/:id',
    component: FollowingsComponent,
    canActivate: [AuthGuard],
    resolve: {
      profile: ProfileResolver
    }
  },
  {
    path: 'mail',
    component: WriteMailComponent,
    canActivate: [AuthGuard],
    resolve: {
      profiles: ProfilesResolver
    },
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
