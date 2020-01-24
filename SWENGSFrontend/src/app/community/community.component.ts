import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../service/profile.service';
import {RelationshipService} from '../service/relationship.service';
import {JwtHelperService} from '@auth0/angular-jwt';


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  displayedColumns = ['pictures', 'username', 'greenscore', 'first_name', 'id'];
  readonly accessTokenLocalStorageKey = 'access_token';
  userId: number;
  profilesAll;
  followingsAll: any[];
  private finished: boolean;
  usernameLogIn: string;

  constructor(private http: HttpClient, private profileService: ProfileService, private relService: RelationshipService,
              public jwtHelper: JwtHelperService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.userId = this.jwtHelper.decodeToken(token).user_id;
  }


  ngOnInit() {
    this.finished = false;
    this.profileService.getProfile(this.userId).subscribe((res: any) => {
      this.usernameLogIn = res.username;
    });
    this.profileService.getProfiles().subscribe((response: any[]) => {
      this.profilesAll = response;
    });
    this.relService.getFollowings().subscribe((res: any[]) => {
        this.followingsAll = res;
        this.finished = true;
      }
    );
  }

  followsAlready(profile: any) {
    for (const p of this.followingsAll) {
      if (p.username === profile.username) {
        return true;
      }
    }
  }

  follow(profile: any) {
    this.relService.sendFollow(profile).subscribe();
  }

  /*  doFilter = (value: string) => {
      this.profiles.filter = value.trim().toLocaleLowerCase();
    }*/

  sendBlock(profile: any) {
    this.relService.sendBlock(profile.username).subscribe();
  }
}
