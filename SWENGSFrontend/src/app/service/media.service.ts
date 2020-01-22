import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) {
  }

  getMedia(mediaId: any) {
    return this.http.get('api/media/' + mediaId + '/get');
  }
}
