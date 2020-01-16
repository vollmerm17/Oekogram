import {Component, OnInit} from '@angular/core';
import {PostService} from '../service/post.service';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})



export class PostingComponent implements OnInit {

  posts: any[];



  constructor(private postService: PostService, private userService: UserService) {
  }

  // panelOpenState = false;

  ngOnInit() {
    this.postService.getAllPosts().subscribe((response: any) => {this.posts = response; });


  }

  openComments() {
    alert('hello');
  }


}
