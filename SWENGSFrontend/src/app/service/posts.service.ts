import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private profile: any;

  constructor(private http: HttpClient) { }


  getAllPosts() {
    return this.http.get('/api/post/get');
  }
  getUserName(id: string) {
    // this.http.get('/api/profile/' + id + '/get').subscribe((response: any) => {this.profile = response; });

   // return this.profile.username;

    return 'John Doe';
  }
}
