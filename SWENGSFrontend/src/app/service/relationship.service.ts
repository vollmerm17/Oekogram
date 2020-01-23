import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  constructor(private http: HttpClient) {
  }

  getFriends() {
    return this.http.get('api/friendship/get');
  }


  getRequests() {
    return this.http.get('api/friendship/request');
  }

  sendRequest(username: any) {
    return this.http.post('api/friendship/' + username + 'request', null);
  }

  sendBlock(username: any) {
    return this.http.post('api/blocked/' + username + 'add', null);
  }

  getBlocks() {
    return this.http.get('api/blocked/get');
  }

  countRequests() {
    return this.http.get('api/friendship/request/count');
  }
}

