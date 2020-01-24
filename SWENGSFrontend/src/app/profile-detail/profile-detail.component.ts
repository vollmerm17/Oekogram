import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../service/profile.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  readonly accessTokenLocalStorageKey = 'access_token';
  profile;
  picture;
  myUserId;
  following = true; // hier soll eigentlich liste hin: wem folgt user alles?

  constructor(private http: HttpClient, private profileService: ProfileService, private route: ActivatedRoute,
              public jwtHelper: JwtHelperService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.myUserId = this.jwtHelper.decodeToken(token).user_id;
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.profile = data.profile;
    this.picture = this.profile.pictures[0];
  }

  changeFollowingState() {

  }
}
