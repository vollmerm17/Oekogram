import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommentsService} from '../service/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  i = 0;

  constructor(public commentService: CommentsService) {
  }

  @Input()
  id: string;

  comments: any[];

  ngOnInit() {
    this.commentService.getCommentsByPostID(this.id).subscribe((response: any) => {
      this.comments = response;
    });

  }

}
