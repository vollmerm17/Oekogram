import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {


  panelOpenState = false;
  isAuthenticated = false;

    constructor(private userService: UserService) {}

  ngOnInit() {
     this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
     });

  }
}





