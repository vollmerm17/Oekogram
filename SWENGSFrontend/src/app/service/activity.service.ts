import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) {
  }

  getActivities() {
    return this.http.get <any[]>('/api/activity/options');
  }

  getActivity(id: string) {
    return this.http.get('/api/activity/' + id + '/get');
  }

  createActivity(act: any) {
    return this.http.post('/api/activity/create', act);
  }
}
