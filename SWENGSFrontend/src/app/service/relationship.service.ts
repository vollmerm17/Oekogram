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

  sendFollow(profile: any) {
    return this.http.post('api/follow/' + profile.username + '/add', profile);
  }

  sendBlock(username: any) {
    return this.http.post('api/blocked/' + username + '/add', null);
  }

  getBlockings() {
    return this.http.get('api/blocking/get');
  }

  getBlocks() {
    return this.http.get('api/blocked/get');
  }

  removeBlock(id: any) {
    return this.http.delete('api/blocked/' + id + '/delete');
  }

  removeFollow(id: any) {
    return this.http.delete('api/follow/' + id + '/delete');
  }
}

