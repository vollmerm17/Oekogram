import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup;
  isAuthenticated;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;});
  }

  login() {

/*    this.userService.login(this.loginFormGroup.value);*/
    this.http.post('/api/api-token-auth/', this.loginFormGroup.value, this.isAuthenticated)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        window.location.reload();
        this.isAuthenticated = this.userService.isLoggedIn;
      }, () => {
        alert('wrong username or password');
      });
  }

}
