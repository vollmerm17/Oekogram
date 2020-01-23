import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WritePostingService {

  constructor(private http: HttpClient) { }

  createPost(post: any) {
    return this.http.post('/api/post/create', post);
  }
}
