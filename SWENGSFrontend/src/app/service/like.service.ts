import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikeService {


  constructor(private http: HttpClient) {
  }

  getLikesByUserID(id: number) {
    return this.http.get('api/like/' + id + '/get');
  }


  removeLike(userId: number, postId: number) {
    return this.http.delete('api/like/' + userId + '/' + postId + '/delete');
  }


}
