import {Component, Input, OnInit} from '@angular/core';
import {CommentsService} from '../service/comments.service';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {ProfileService} from '../service/profile.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(public commentService: CommentsService, private fb: FormBuilder, private http: HttpClient) {
  }

  @Input()
  id: string;

  @Input()
  userId;

  comments: any[];
  commentslength: number;
  commentFormGroup;

  ngOnInit() {
    this.commentService.getCommentsByPostID(this.id).subscribe((response: any) => {
      this.comments = response;
      this.commentFormGroup.controls.posts_id.setValue(this.id);
      this.commentFormGroup.controls.user_id.setValue(this.userId);
      this.commentslength = response.length;
    });


    this.commentFormGroup = this.fb.group({
      id: [null],
      posts_id: [''],
      user_id: [''],
      content: ['']
    });

  }

  writeComment() {
    const comment = this.commentFormGroup.value;

    this.http.post('api/comment/create', comment).subscribe(() => {
      window.location.reload();
    });
  }

}
