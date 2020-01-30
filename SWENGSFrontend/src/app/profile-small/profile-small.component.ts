import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../service/profile.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {interval} from 'rxjs';

@Component({
  selector: 'app-profile-small',
  templateUrl: './profile-small.component.html',
  styleUrls: ['./profile-small.component.scss']
})
export class ProfileSmallComponent implements OnInit {

  readonly accessTokenLocalStorageKey = 'access_token';
  userId: number;
  username: string;
  fullName: string;
  greenScore: number;
  private pictures;


  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private profileService: ProfileService, public jwtHelper: JwtHelperService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.userId = this.jwtHelper.decodeToken(token).user_id;
  }

  ngOnInit() {
    this.profileService.getProfile(this.userId).subscribe((res: any) => {
      this.username = res.username;
      this.fullName = res.first_name;
      this.greenScore = res.greenscore;
      this.pictures = res.pictures[0];
    });

    const source = interval(10000);
    source.subscribe(val => this.reloadGreenscore());
  }

  reloadGreenscore() {
    this.profileService.getProfile(this.userId).subscribe((res: any) => {
      this.greenScore = res.greenscore;
    });
  }
}

