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
import {TokenStorageService} from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public router: Router, private tokenStorage: TokenStorageService) {
  }

  get isLoggedIn(): boolean {
    return this.tokenStorage.getToken() !== null;
  }

  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  // Sign-in
  login(email: string, password: string): Observable<any> {
    this.changeMessage('Login en cour .....');
    return this.http.post<any>(login, {
      email,
      password
    }, {headers: this.headers}).pipe(tap(res =>{ res
    this.changeMessage('user LogIn')}),
      catchError(this.errorHandler)
    );
  }

  refreshToken(token: string) {
    return this.http.post(tokenRefresh, {
      refresh_token: token,
    }, httpOptions);
  }

  errorHandler({error}: { error: any }) {
    this.changeMessage('vérifier vos coordonnées ')
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
