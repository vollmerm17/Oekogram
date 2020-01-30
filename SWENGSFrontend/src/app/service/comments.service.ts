import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  constructor(private http: HttpClient) {
  }

  getCommentsByPostID(id: string) {
    return this.http.get('api/comment/' + id + '/get');
  }

  deleteComment(id: string) {
    return this.http.delete('/api/comment/' + id + '/delete');
  }
}
