import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  colspan;
  colspanProfile;
  colspanPosts;
  rowheightPost;
  rowhheightProfile;
  panelOpenState = false;
  isAuthenticated: boolean;

  ngOnInit() {
    this.calculateColSpan();
    this.calculateRowHeight();
  }

  calculateColSpan() {
    if (window.innerWidth <= 400) {
      this.colspan = 1;
      this.colspanPosts = 1;
      this.colspanProfile = 1;
    } else {
      this.colspan = 3;
      this.colspanPosts = 2;
      this.colspanProfile = 1;
    }
  }

  onResize() {
    this.calculateColSpan();
    this.calculateRowHeight();
  }

  calculateRowHeight() {
    // 30 * Anzahl der Posts
    this.rowheightPost = 25 * 1;
    this.rowhheightProfile = 4 + this.rowheightPost;

  }

}





