import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../service/profile.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RelationshipService} from '../service/relationship.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  readonly accessTokenLocalStorageKey = 'access_token';
  profile;
  myProfile;
  picture;
  myUserId;
  following = false;
  blocking = false;
  followersCount = 0;
  followingsCount = 0;
  followingsAll: any[number] = [];
  followersUserAll: any[number] = [];
  followingsUserAll: any[number] = [];
  finishedLoadFollowings = false;
  finishedLoadFollowers = false;
  blockingsAll: any[number] = [];
  finishedBlockings = false;

  constructor(private http: HttpClient, private profileService: ProfileService, private route: ActivatedRoute,
              public jwtHelper: JwtHelperService, private relService: RelationshipService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.myUserId = this.jwtHelper.decodeToken(token).user_id;
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    this.profile = data.profile;
    this.picture = this.profile.pictures[0];
    if (this.profile.id === this.myUserId) {
      this.myProfile = true;
    }

    // Get a list of everyone who the logged in user is following
    this.relService.getFollowings().subscribe((res: any[]) => {
        for (const f of res) {
          this.followingsAll.push(f.pk);
        }
        // Check if logged in user already follows the selected user
        if (this.followsAlready()) {
          this.following = true;
        }
      }
    );

    // Get a list of everyone who the logged in user is blocking
    this.relService.getBlockings().subscribe((res: any[]) => {
      for (const f of res) {
        this.blockingsAll.push(f.pk);
      }
      // Check if logged in user already blocks the selected user
      if (this.blocksAlready()) {
        this.blocking = true;
      }
      this.finishedBlockings = true;
    });

    // Get a list of everyone who follows the selected user (length = amount of followers)
    this.relService.getUserFollowers(this.profile.id).subscribe((response: any[]) => {
        for (const f of response) {
          this.followersUserAll.push(f.pk);
        }
        this.followersCount = this.followersUserAll.length;
        this.finishedLoadFollowers = true;
      }
    );

    // Get a list of everyone who is followed by the selected user (length = amount of followings)
    this.relService.getUserFollowings(this.profile.id).subscribe((res: any[]) => {
        for (const f of res) {
          this.followingsUserAll.push(f.pk);
        }
        this.followingsCount = this.followingsUserAll.length;
        this.finishedLoadFollowings = true;
      }
    );

  }

  changeFollowingState() {
    if (this.following) {
      this.relService.removeFollow(this.profile.id).subscribe(() =>
        this.following = false);
      this.followersCount--;
    } else {
      this.relService.sendFollow(this.profile.id).subscribe(() =>
        this.following = true);
      this.followersCount++;
    }
  }

  changeBlockingState() {
    if (this.blocking) {
      this.relService.removeBlock(this.profile.id).subscribe(() =>
        this.blocking = false);
    } else {
      this.relService.sendBlock(this.profile.id).subscribe(() =>
        this.blocking = true);
    }
  }

  followsAlready() {
    for (const p of this.followingsAll) {
      if (p === this.profile.id) {
        return true;
      }
    }
  }

  blocksAlready() {
    for (const p of this.blockingsAll) {
      if (p === this.profile.id) {
        return true;
      }
    }
  }
}
