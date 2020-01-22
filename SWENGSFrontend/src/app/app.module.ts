import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FileUploadModule} from 'ng2-file-upload';
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
import { HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { HeaderComponent } from './header/header.component';
import {DragDirective} from './write-posting/dragDrop.directive';
import { FooterComponent } from './footer/footer.component';
import { CommentComponent } from './comment/comment.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import {MediainputComponent} from './mediainput/mediainput.component';
import {DateComponent} from './date/date.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {WebcamModule} from 'ngx-webcam';


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
    DragDirective,
    FooterComponent,
    CommentComponent,
    ProfileFormComponent,
    MediainputComponent,
    DateComponent,
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    ReactiveFormsModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
