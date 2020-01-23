import {Component, OnInit} from '@angular/core';
import {FileHandle} from './dragDrop.directive';
import {WebcamImage} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {WritePostingService} from '../service/write-posting.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-write-posting',
  templateUrl: './write-posting.component.html',
  styleUrls: ['./write-posting.component.scss']
})
export class WritePostingComponent implements OnInit {
  files: FileHandle[] = [];
  readonly accessTokenLocalStorageKey = 'access_token';
  userId;
  writePostFormGroup: FormGroup;
  activityOptions;
  contentValue = '';
  showWebcam = false;
  webcamImage: WebcamImage = null;

  private trigger: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, public jwtHelper: JwtHelperService,
              private writePostService: WritePostingService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    this.userId = this.jwtHelper.decodeToken(token).user_id;
  }

 /* filesDropped(files: FileHandle[]): void {
    this.files = files;
  }
*/
  ngOnInit() {
    this.writePostFormGroup = this.fb.group({
      id: [null],
      user_id: [this.userId],
      content: [],
      pictures: [[]],
      activity: [],
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
    const post = this.writePostFormGroup.value;
    this.writePostService.createPost(post).subscribe(() => {
        alert('created successfully');
      });
  }

}
