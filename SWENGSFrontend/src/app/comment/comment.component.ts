import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  commentContent = '';

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

  /*ngOnChanges(changes: SimpleChanges): void {
    console.info('user-view changed');
  }*/

  writeComment() {
    const comment = this.commentFormGroup.value;

    this.http.post('api/comment/create', comment).subscribe((res) => {
      this.comments.push(res);
      this.commentContent = '';
      // window.location.reload();
    });
  }

  removeComment(comment: any) {
    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.removeCommentfromComments(comment.id);
      alert('Comment successfully deleted');
      /*this.router.navigate([this.router.url]);*/
    });
  }

  removeCommentfromComments(commentId: number) {
    let i = 0;
    for (const comment of this.comments) {
      if (comment.id === commentId) {
        this.comments.splice(i, 1);
      }
      i++;
    }
  }

  commentValid() {
    return this.commentContent.length > 0;
  }
}
