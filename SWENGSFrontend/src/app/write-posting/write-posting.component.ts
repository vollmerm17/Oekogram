import { Component, OnInit } from '@angular/core';
import { FileHandle } from './dragDrop.directive';

@Component({
  selector: 'app-write-posting',
  templateUrl: './write-posting.component.html',
  styleUrls: ['./write-posting.component.scss']
})
export class WritePostingComponent implements OnInit {
  files: FileHandle[] = [];

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  ngOnInit() {
  }

}
