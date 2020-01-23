import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {ActivityService} from '../service/activity.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityOptionsResolver implements Resolve<Observable<any>> {
  constructor(private activityService: ActivityService) {
  }

  resolve() {
    return this.activityService.getActivities();
  }
}
