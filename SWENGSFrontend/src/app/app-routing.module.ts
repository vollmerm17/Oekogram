import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PostingComponent} from './posting/posting.component';
import {ProfileFormComponent} from './profile-form/profile-form.component';
import {AuthGuard} from './auth.guard';
import {ProfileResolver} from './resolver/profile.resolver';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'posting', component: PostingComponent},
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], resolve: {
      profile: ProfileResolver
    },
  },
  {
    path: 'profile-form', component: ProfileFormComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
