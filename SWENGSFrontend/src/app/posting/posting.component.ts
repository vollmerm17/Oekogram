import {Component, OnInit} from '@angular/core';
import {PostsService} from '../service/posts.service';

export interface FrontEndPostInterface {
  title: string;
  content: string;
  date: string;
  username: string;
}

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})



export class PostingComponent implements OnInit {

  posts: any[];
  frontEndPost: FrontEndPostInterface[];

  constructor(public postService: PostsService) {
  }

  // panelOpenState = false;

  ngOnInit() {
    this.postService.getAllPosts().subscribe((response: any[]) => {this.posts = response; });

    this.posts.forEach(function(value) {
      this.frontEndPost.title = value.title;
      this.frontEndPost.date = 'DD.MM.YYYY';
      this.frontEndPost.content = value.content;
      this.frontEndPost.username = this.postService.getUserName(value.user_id);
    });

  }

}
