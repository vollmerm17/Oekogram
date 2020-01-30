import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../service/profile.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NavigationEnd, Router} from '@angular/router';
import {interval} from 'rxjs';

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
  private pictures;
  // navigationSubscription;

  constructor(private http: HttpClient, private profileService: ProfileService, public jwtHelper: JwtHelperService,
              private router: Router) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.userId = this.jwtHelper.decodeToken(token).user_id;

    /*this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });*/
  }

  ngOnInit() {

    this.profileService.getProfile(this.userId).subscribe((res: any) => {
      this.username = res.username;
      this.fullName = res.first_name + ' ' + res.last_name;
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
  /*ngOnDestroy() {
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }*/
}
