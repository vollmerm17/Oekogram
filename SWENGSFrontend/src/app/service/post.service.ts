import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getAllPosts() {
    return this.http.get('/api/post/get');
  }

  updatePost(id: string, post: any) {
    return this.http.put('/api/post/' + id + '/update', post);
  }

  getPostByUserID(id: string) {
    return this.http.get('api/post/' + id + '/get');
  }


}
