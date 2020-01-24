import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../service/profile.service';
import {RelationshipService} from '../service/relationship.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  displayedColumns = ['pictures', 'username', 'greenscore', 'first_name', 'id'];
  private profilesAll: any[];
  followingsAll: any[];

  constructor(private http: HttpClient, private profileService: ProfileService, private relService: RelationshipService) {
  }

  ngOnInit() {
    this.profileService.getProfiles().subscribe((response: any[]) => {
      this.profilesAll = response;
    });
    this.relService.getFollowings().subscribe((res: any[]) => {
        this.followingsAll = res;
      }
    );
  }

/*  doFilter = (value: string) => {
    this.profiles.filter = value.trim().toLocaleLowerCase();
  }*/

  sendBlock(profile: any) {
    this.relService.sendBlock(profile.username);
  }

  followsAlready(profile: any) {
    for (const p of this.followingsAll) {
      if (p.fields.username === profile.username) {
        return true;
      }
    }
  }
}
