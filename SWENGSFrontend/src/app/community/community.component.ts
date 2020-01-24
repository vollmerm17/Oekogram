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

  constructor(private http: HttpClient, private profileService: ProfileService, private relService: RelationshipService) {
  }

  ngOnInit() {
    this.profileService.getProfiles().subscribe((response: any[]) => {
      this.profilesAll = response;
    });
  }

  sendRequest(profile: any) {
    this.relService.sendRequest(profile.username);
  }

/*  doFilter = (value: string) => {
    this.profiles.filter = value.trim().toLocaleLowerCase();
  }*/

  sendBlock(profile: any) {
    this.relService.sendBlock(profile.username);
  }
}
