import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {ProfileService} from '../service/profile.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  readonly accessTokenLocalStorageKey = 'access_token';
  userId: number;
  userName: string;
  greenScore: number;
  isChanging: boolean;
  decoded: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private profileService: ProfileService, public jwtHelper: JwtHelperService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.userId = this.jwtHelper.decodeToken(token).user_id;
  }

  ngOnInit() {

    const data = this.route.snapshot.data;


    this.profileService.getProfile(this.userId).subscribe((res: any) => {
        this.userName = res.first_name + ' ' + res.last_name; this.greenScore = res.greenscore;
    });

    /*this.http.post('/api/api-token-auth/', this.loginFormGroup.value, this.isAuthenticated)
      .subscribe((res: User) => {
        localStorage.setItem('access_token', res.token);
    const data = this.route.snapshot.data;*/
    // this.profileAttributes = data.profileAttributes;

    // this.profileService.getProfile()
  }

  changeProfile() {
    this.isChanging = true;
  }

}
