import {Component, OnInit} from '@angular/core';
import {PostService} from '../service/post.service';



@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})



export class PostingComponent implements OnInit {

  posts: any[];



  constructor(private postService: PostService) {
  }

  // panelOpenState = false;

  ngOnInit() {
    this.postService.getAllPosts().subscribe((response: any) => {this.posts = response; });


  }


}
