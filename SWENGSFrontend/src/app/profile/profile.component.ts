import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  username: string;
  fullName: string;
  greenScore: number;
  isChanging: boolean;
  decoded: any;
  private profile;
  private pictures;


  constructor(private http: HttpClient, private profileService: ProfileService, public jwtHelper: JwtHelperService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.userId = this.jwtHelper.decodeToken(token).user_id;
  }

  ngOnInit() {

    this.profileService.getProfile(this.userId).subscribe((res: any) => {
      this.username = res.username;
      this.fullName = res.first_name + ' ' + res.last_name;
      this.greenScore = res.greenscore;
      this.pictures = res.pictures[0];
    });
  }
  
}
