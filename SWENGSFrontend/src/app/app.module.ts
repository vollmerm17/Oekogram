import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatTabsModule
} from '@angular/material';
import { PostingComponent } from './posting/posting.component';
import { WritePostingComponent } from './write-posting/write-posting.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { ProfileIconsComponent } from './profile-icons/profile-icons.component';
import {JwtModule} from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { HeaderComponent } from './header/header.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    PostingComponent,
    WritePostingComponent,
    ProfileComponent,
    SearchComponent,
    ProfileIconsComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
    HttpClientModule,
    MatInputModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
