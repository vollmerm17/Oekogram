import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfiles() {
    return this.http.get('api/profile/list');
  }

  getProfile(profileId: any) {
    return this.http.get('api/profile/' + profileId + '/get');
  }

  createProfile(profile: any) {
    return this.http.post('/api/profile/create', profile);
  }

  updateProfile(profile: any) {
    return this.http.put('/api/profile/' + profile.Id + '/change', profile);
  }

  deleteProfile(profileId: any) {
    return this.http.delete('api/profile/' + profileId + '/delete');
  }

}
