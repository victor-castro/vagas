import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'e4c86aef82a8f26f81f2',
    domain: 'github.com/login/oauth',
    responseType: 'token',
    redirectUri: 'http://localhost:4200/',
    scope: ''
  });

  constructor(public router: Router, private $http: HttpClient, private $route: ActivatedRoute) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication() {
    this.$route.queryParams.subscribe(params => {
      if(params.code) {
        debugger;
        this.getToken(params.code).then(res => {
          window.location.search = '';
          this.setSession(res);
        }, error => {
        });
      }
    })
  }

  public getToken(code) {
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    const queryParams = new HttpParams({fromObject: {
      client_id: 'e4c86aef82a8f26f81f2',
      client_secret: '854d8302ce04302344e6175a59fdfa46f2cd2f85',
      code: code
    }});
    return this.$http.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', {}, { headers: myheader, params: queryParams }).pipe(
      map(res => res.json())
    )
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    console.log(authResult)
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
}
