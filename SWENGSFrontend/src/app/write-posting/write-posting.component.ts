import {Component, OnInit} from '@angular/core';
import {FileHandle} from './dragDrop.directive';
import {WebcamImage} from 'ngx-webcam';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-write-posting',
  templateUrl: './write-posting.component.html',
  styleUrls: ['./write-posting.component.scss']
})
export class WritePostingComponent implements OnInit {
  files: FileHandle[] = [];
  showWebcam = false;

  webcamImage: WebcamImage = null;

  private trigger: Subject<void> = new Subject<void>();

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  ngOnInit() {
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

}
