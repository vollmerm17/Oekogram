import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  constructor(private http: HttpClient) {
  }

  getFollowers() {
    return this.http.get('api/followers/get');
  }

  getListFollowers(profileId: any) {
    return this.http.get('api/followers/' + profileId + '/list');
  }

  getFollowings() {
    return this.http.get('api/follows/get');
  }

  getListFollowings(profileId: any) {
    return this.http.get('api/follows/' + profileId + '/list');
  }


  getUserFollowers(profileId: any) {
    return this.http.get('api/followers/' + profileId + '/get');
  }

  getUserFollowings(profileId: any) {
    return this.http.get('api/follows/' + profileId + '/get');
  }

  sendFollow(profileId: any) {
    return this.http.post('api/follow/' + profileId + '/add', null);
  }

  sendBlock(profileId: any) {
    return this.http.post('api/blocked/' + profileId + '/add', null);
  }

  getBlockings() {
    return this.http.get('api/blocking/get');
  }


  removeBlock(profileId: any) {
    return this.http.delete('api/blocked/' + profileId + '/delete');
  }

  removeFollow(profileId: any) {
    return this.http.delete('api/follow/' + profileId + '/delete');
  }
}

