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
  followingsAll: any[string] = [];
  private finished: boolean;
  usernameLogIn: string;
  blockingsAll: any[string] = [];
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
        for (const f of res) {
          this.followingsAll.push(f.fields.username);
        }
      }
    );
    this.relService.getBlockings().subscribe((res: any[]) => {
        for (const f of res) {
          this.blockingsAll.push(f.fields.username);
        }
        this.finished = true;
      }
    );
  }

  followsAlready(profile: any) {
    for (const p of this.followingsAll) {
      if (p === profile.username) {
        return true;
      }
    }
  }

  isItMe(profile: any) {
    return this.usernameLogIn === profile.username;
  }


  follow(profile: any) {
    this.relService.sendFollow(profile).subscribe((this.followingsAll.push(profile.username)));
  }

  removeFollow(profile: any) {
    this.relService.removeFollow(profile.username).subscribe(() => this.removeFollowfromFollows(profile.username));

  }

  removeFollowfromFollows(profileUsername: string) {
    for (const p of this.followingsAll) {
      let i = 0;
      if (p.username === profileUsername) {
        this.followingsAll.splice(i, 1);
      }
      i++;
    }
  }

  blocksAlready(profile: any) {
    for (const p of this.blockingsAll) {
      if (p === profile.username) {
        return true;
      }
    }
  }

  block(profile: any) {
    this.relService.sendBlock(profile.username).subscribe((this.blockingsAll.push(profile.username)));
  }

  removeBlockfromBlocks(profileUsername: string) {
    for (const p of this.blockingsAll) {
      let i = 0;
      if (p.username === profileUsername) {
        this.blockingsAll.splice(i, 1);
      }
      i++;
    }
  }

  removeBlock(profile: any) {
    this.relService.removeBlock(profile.username).subscribe(() => this.removeBlockfromBlocks(profile.username));
  }

}
