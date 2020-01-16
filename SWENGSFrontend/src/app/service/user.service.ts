import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly accessTokenLocalStorageKey = 'access_token';
  isLoggedIn = new BehaviorSubject(false);
  user = new BehaviorSubject('');

  // user: any;

  constructor(private http: HttpClient, private router: Router, private jwtHelperService: JwtHelperService) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token));
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn.next(tokenValid);
      this.user.next(localStorage.getItem('username'));
    }
  }

  login(userData: { username: string, password: string }) {
    this.http.post('/api/api-token-auth/', userData)
      .subscribe((res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('username', userData.username);
        this.router.navigate(['posting']);
      }, () => {
        alert('wrong username or password');
      });
  }

  logout() {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }



}
