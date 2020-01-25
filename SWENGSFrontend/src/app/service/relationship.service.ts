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

  getFollowings() {
    return this.http.get('api/follows/get');
  }

  getUserFollowers(username: any) {
    return this.http.get('api/followers/' + username + '/get');
  }

  getUserFollowings(username: any) {
    return this.http.get('api/follows/' + username + '/get');
  }

  sendFollow(profile: any) {
    return this.http.post('api/follow/' + profile.username + '/add', profile);
  }

  sendBlock(username: any) {
    return this.http.post('api/blocked/' + username + '/add', null);
  }

  getBlocks() {
    return this.http.get('api/blocked/get');
  }

  getBlockings() {
    return this.http.get('api/blocking/get');
  }

  removeBlock(username: any) {
    return this.http.delete('api/blocked/' + username + '/delete');
  }

  removeFollow(username: any) {
    return this.http.delete('api/follow/' + username + '/delete');
  }
}

