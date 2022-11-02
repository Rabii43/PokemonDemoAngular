import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import {Router} from '@angular/router';

import {login, tokenRefresh} from '../../../api/entryPoint';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public router: Router) {
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  // Sign-in
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(login, {
      email,
      password
    }, {headers: this.headers}).pipe(tap(res => res),
      catchError(this.errorHandler)
    );
  }


  refreshToken(token: string) {
    return this.http.post(tokenRefresh, {
      refresh_token: token,
    }, httpOptions);
  }


  getToken() {
    return localStorage.getItem('access_token');
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  errorHandler({error}: { error: any }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
