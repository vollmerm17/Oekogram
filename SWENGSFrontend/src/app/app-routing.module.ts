import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PostingComponent} from './posting/posting.component';
import {ProfileFormComponent} from './profile-form/profile-form.component';
import {AuthGuard} from './auth.guard';
import {ProfileResolver} from './resolver/profile.resolver';
import {ProfileComponent} from './profile/profile.component';
import {LogoutComponent} from './logout/logout.component';



const routes: Routes = [
  {path: '', component: LoginComponent},
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
      profile: ProfileResolver
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
