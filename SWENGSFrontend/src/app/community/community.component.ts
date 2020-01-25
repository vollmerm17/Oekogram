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

  displayedColumns = ['pictures', 'username', 'greenscore', 'actionFollow', 'actionBlock'];
  readonly accessTokenLocalStorageKey = 'access_token';
  userId;
  profilesAll;
  followingsAll: any[number] = [];
  private finished: boolean;
  userIdLogIn;
  blockingsAll: any[number] = [];
  search: '';
  beingBlockedAll;


  constructor(private http: HttpClient, private router: Router, private profileService: ProfileService,
              private relService: RelationshipService, public jwtHelper: JwtHelperService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.userId = this.jwtHelper.decodeToken(token).user_id;
  }


  ngOnInit() {
    this.finished = false;

    this.profileService.getProfile(this.userId).subscribe((res: any) => {
      this.userIdLogIn = res.id;
    });

    this.profileService.getProfiles().subscribe((response: any[]) => {
      this.profilesAll = response;
    });

    this.relService.getFollowings().subscribe((res: any[]) => {
      for (const f of res) {
        this.followingsAll.push(f.pk);
      }
    });

    this.relService.getBlockings().subscribe((res: any[]) => {
      for (const f of res) {
        this.blockingsAll.push(f.pk);
      }
      this.finished = true;
    });
  }


  followsAlready(profile: any) {
    for (const p of this.followingsAll) {
      if (p === profile.id) {
        return true;
      }
    }
  }

  isItMe(profile: any) {
    return this.userIdLogIn === profile.id;
  }


  follow(profile: any) {
    this.relService.sendFollow(profile.id).subscribe();
    (this.followingsAll.push(profile.id));
  }

  removeFollow(profile: any) {
    this.relService.removeFollow(profile.id).subscribe(() => this.removeFollowfromFollows(profile.id));

  }

  removeFollowfromFollows(profileId: any) {
    const i: number = this.followingsAll.indexOf(profileId);
    if (i !== -1) {
      this.followingsAll.splice(i, 1);
    }
  }

  blocksAlready(profile: any) {
    for (const p of this.blockingsAll) {
      if (p === profile.id) {
        return true;
      }
    }
  }

  block(profile: any) {
    this.relService.sendBlock(profile.id).subscribe();
    (this.blockingsAll.push(profile.id));
  }

  /*  removeBlockfromBlocks(profileUsername: string) {
      for (const p of this.blockingsAll) {
        let i = 0;
        if (p.username === profileUsername) {
          this.blockingsAll.splice(i, 1);
        }
        i++;
      }
    }*/

  removeBlockfromBlocks(profileId: any) {
    const i: number = this.blockingsAll.indexOf(profileId);
    if (i !== -1) {
      this.blockingsAll.splice(i, 1);
    }
  }


  removeBlock(profile: any) {
    this.relService.removeBlock(profile.id).subscribe(() => this.removeBlockfromBlocks(profile.id));
  }

}
