import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../service/post.service';
import {UserService} from '../service/user.service';
import {LikeService} from '../service/like.service';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../service/profile.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})


export class PostingComponent implements OnInit {

  posts: any[];
  userId: number;
  postFormGroup;
  likeFormGroup;
  readonly accessTokenLocalStorageKey = 'access_token';


  constructor(private http: HttpClient, private postService: PostService,
              private userService: UserService, public likeService: LikeService,
              private profileService: ProfileService, public jwtHelper: JwtHelperService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.userId = this.jwtHelper.decodeToken(token).user_id;
  }


  // postid: number;

  @Input()
  postByUserID: string;

  like: any;
  likes: any[];
  post;
  postOptions;
  finished = false;
  postFinished = false;
  username;
  pictures;

  // panelOpenState = false;
  user;

  ngOnInit() {
    // const postByUserID = this.route.snapshot.paramMap.get('id');

    if (this.postByUserID == null) {
      this.postService.getAllPosts().subscribe((response: any) => {
        this.posts = response;
      });
    } else {
      this.postService.getPostByUserID(this.postByUserID).subscribe((response: any) => this.posts = response);
    }

    this.likeService.getLikesByUserID(this.userId).subscribe((response: any) => {
      this.likes = response;
      this.finished = true;
    });
    this.likeFormGroup = this.fb.group({
        user_id: new FormControl(),
        post_id: new FormControl(),
        liked: new FormControl(),
      }
    );
  }

  checkPostId(postid: number): boolean {
    for (const like of this.likes) {
      if (like.post_id === postid) {
        return true;
      }
    }
    return false;
  }

  updateLikes(id: string, post: any, value: number) {
    const newpost = post;
    newpost.likes = newpost.likes + value;
    this.postService.updatePost(id, newpost).subscribe();
  }


  removeLike(userid: number, postid: number) {
    this.likeService.removeLike(userid, postid).subscribe(() => this.removeLikefromLikes(postid));
  }

  likePost(id: string) {
    this.like = this.likeFormGroup.patchValue({user_id: this.userId, post_id: id, liked: true});
    this.like = this.likeFormGroup.value;
    this.http.post('api/like/create', this.like).subscribe(() => this.likes.push(this.like));

  }

  removeLikefromLikes(postid: number) {
    for (const like of this.likes) {
      let i = 0;
      if (like.post_id === postid) {
        this.likes.splice(i, 1);
      }
      i++;
    }
  }
}

