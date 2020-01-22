import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PostingComponent} from './posting/posting.component';
import {ProfileFormComponent} from './profile-form/profile-form.component';
import {AuthGuard} from './auth.guard';
import {ProfileResolver} from './resolver/profile.resolver';
import {ProfileComponent} from './profile/profile.component';
import {LogoutComponent} from './logout/logout.component';
import {MediainputComponent} from './mediainput/mediainput.component';
import {MediaResolver} from './resolver/media.resolver';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'posting', component: PostingComponent},
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], resolve: {
      profile: ProfileResolver
    },
  },
  {
    path: 'profile-form/:id', component: ProfileFormComponent, canActivate: [AuthGuard], resolve: {
      profile: ProfileResolver, picture: MediaResolver
    }
  },
    {
    path: 'media/:id/get', component: MediainputComponent, canActivate: [AuthGuard], resolve: {
      profile: MediaResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
