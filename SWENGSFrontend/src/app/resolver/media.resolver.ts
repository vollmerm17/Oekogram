import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {MediaService} from '../service/media.service';

@Injectable({
  providedIn: 'root'
})
export class MediaResolver implements Resolve<Observable<any>> {
  constructor(private mediaService: MediaService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.mediaService.getMedia(route.paramMap.get('id'));
  }
}
