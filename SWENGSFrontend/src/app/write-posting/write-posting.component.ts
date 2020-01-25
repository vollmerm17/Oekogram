import {Component, OnInit} from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {WritePostingService} from '../service/write-posting.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ProfileService} from '../service/profile.service';
import {ActivityService} from '../service/activity.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-write-posting',
  templateUrl: './write-posting.component.html',
  styleUrls: ['./write-posting.component.scss']
})
export class WritePostingComponent implements OnInit {
  readonly accessTokenLocalStorageKey = 'access_token';
  userId;
  writePostFormGroup: FormGroup;
  activityOptions;
  contentValue = '';
  showWebcam = false;
  webcamImage: WebcamImage = null;
  userProfile;
  activityFormGroup: FormGroup;

  private trigger: Subject<void> = new Subject<void>();
  showAddActivity = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, public jwtHelper: JwtHelperService,
              private writePostService: WritePostingService,
              private profileService: ProfileService,
              private activityService: ActivityService,
              private userService: UserService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.userId = this.jwtHelper.decodeToken(token).user_id;
  }

  ngOnInit() {
    this.writePostFormGroup = this.fb.group({
      id: [null],
      user_id: [this.userId],
      content: [],
      pictures: [[]],
      activity: [],
    });

    this.activityFormGroup = this.fb.group({
      id: [null],
      name: [''],
      description: [''],
      shortcut: ['xxx'],
      greenscore: [''],
    });

    this.profileService.getProfile(this.userId).subscribe((response: any) => {
      this.userProfile = response;
    });

    const data = this.route.snapshot.data;
    this.activityOptions = data.activityOptions;
  }

  takePicture() {
    this.trigger.next();
  }

  handleImage(image: WebcamImage) {
    this.webcamImage = image;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  createPosting() {
    // this.writePostFormGroup.controls.pictures.setValue(this.webcamImage); muss noch getestet werden!
    const post = this.writePostFormGroup.value;
    this.activityService.getActivity(post.activity).subscribe((response: any) => {
      this.userProfile.greenscore += response.greenscore;
      this.profileService.updateProfile(this.userProfile).subscribe();
    });

    this.writePostService.createPost(post).subscribe(() => {
      alert('created successfully');
    });
  }

  createActivity() {
    const activity = this.activityFormGroup.value;
    this.activityService.createActivity(activity).subscribe(() => {
      this.activityService.getActivities().subscribe((response: any) => {
        this.activityOptions = response; });
      this.showAddActivity = false;
      this.activityFormGroup.reset();
      alert('Activity Added!');
    });
  }
}
