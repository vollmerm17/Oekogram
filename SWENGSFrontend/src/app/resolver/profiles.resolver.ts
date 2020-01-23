import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ProfileService} from '../service/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesResolver implements Resolve<Observable<any>> {
  constructor(private profileService: ProfileService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.profileService.getProfiles();
  }
}
