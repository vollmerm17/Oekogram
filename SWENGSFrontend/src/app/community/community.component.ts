import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../service/profile.service';
import {RelationshipService} from '../service/relationship.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';


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
  followingsAll;
  private finished: boolean;
  usernameLogIn: string;
  blockingsAll;
  search: '';


  constructor(private http: HttpClient, private router: Router, private profileService: ProfileService,
              private relService: RelationshipService, public jwtHelper: JwtHelperService) {
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
      }
    );
    this.relService.getBlockings().subscribe((res: any[]) => {
        this.blockingsAll = res;
        this.finished = true;
      }
    );
  }

  followsAlready(profile: any) {
    for (const p of this.followingsAll) {
      if (p.fields.username === profile.username) {
        return true;
      }
    }
  }

  isItMe(profile: any) {
    return this.usernameLogIn === profile.username;
  }


  follow(profile: any) {
    this.relService.sendFollow(profile).subscribe();
    window.location.reload(); // evtl was besseres?!
  }

  removeFollow(profile: any) {
    this.relService.removeFollow(profile.id).subscribe();
    window.location.reload(); // evtl was besseres?!
  }

  blocksAlready(profile: any) {
    for (const p of this.blockingsAll) {
      if (p.fields.username === profile.username) {
        return true;
      }
    }
  }

  block(profile: any) {
    this.relService.sendBlock(profile.username).subscribe();
    window.location.reload(); // evtl was besseres?!
  }

  removeBlock(profile: any) {
    this.relService.removeBlock(profile.id).subscribe();
    window.location.reload(); // evtl was besseres?!
  }

}
