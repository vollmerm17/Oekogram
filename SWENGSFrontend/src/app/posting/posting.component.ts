import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../service/post.service';
import {UserService} from '../service/user.service';
import {LikeService} from '../service/like.service';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../service/profile.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {RelationshipService} from '../service/relationship.service';
import {ActivityService} from '../service/activity.service';


@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})


export class PostingComponent implements OnInit, OnDestroy {

  @Input()
  postByUserID: string;

  oldNumber: string;
  posts: any[];
  profile: any;
  userId: number;
  likeFormGroup;
  readonly accessTokenLocalStorageKey = 'access_token';
  navigationSubscription;

  constructor(private http: HttpClient, private postService: PostService,
              private userService: UserService, public likeService: LikeService,
              private profileService: ProfileService, private activityService: ActivityService,
              public jwtHelper: JwtHelperService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private relationshipService: RelationshipService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.userId = this.jwtHelper.decodeToken(token).user_id;

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.posts = [];
        this.ngOnInit();
      }
    });
  }

  like: any;
  likes: any[];
  post;
  finished = false;
  username;
  pictures;
  followings: any[];
  user;

  ngOnInit() {
    this.oldNumber = this.postByUserID;
    let getAllPosts = this.route.snapshot.paramMap.get('all');

    if (getAllPosts == null) {
      getAllPosts = '1';
    }

    // const source = interval(10000);
    // source.subscribe(val => {
    this.profileService.getProfile(this.userId).subscribe((res: any) => {
      this.profile = res;
    });

    if (this.postByUserID == null && getAllPosts === '1') {
      this.postService.getAllPosts().subscribe((response: any) => {
        this.posts = response;
      });
    } else if (this.postByUserID == null && getAllPosts === '0') {
      this.relationshipService.getFollowings().subscribe((response: any) => {
        this.followings = response;
        this.postService.getPostsByFollows(this.followings).subscribe((res: any) => {
          this.posts = res;
        });

      });
    } else {
      console.log('dummy');
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
    // });
  }

  ngOnDestroy() {
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
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
    let i = 0;
    for (const like of this.likes) {
      if (like.post_id === postid) {
        this.likes.splice(i, 1);
      }
      i++;
    }
  }

  removePosting(post: any) {
    this.activityService.getActivity(post.activity).subscribe((response: any) => {
      this.profile.greenscore -= response.greenscore;
      this.profileService.updateProfile(this.profile).subscribe();
      this.postService.deletePost(post.id).subscribe(() => {
          alert('Post successfully deleted');
          this.router.navigate([this.router.url]);
        });
    });
  }

  /*navToProfile(userId: any){
    this.router.navigate(['/profile', userId]);
  }*/
}

