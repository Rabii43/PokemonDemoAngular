import {Component, OnInit} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  isLoginFailed = false;
  submitted = false;
  name: string = '';
  password: string = '';
  errorMessage: any;
  message:string='';
  focus!: any;
  focus1!: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private tokenStorage: TokenStorageService
  ) {
    this.errorMessage = new BehaviorSubject(this.authenticationService.currentMessage)
    this.errorMessage.subscribe((value: any) => this.message=value.source.value);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.name == null || this.password == null) {
      this.loading = false;
    }
    this.loading = true;
    this.authenticationService.login(this.name, this.password).subscribe(
      (res) => {
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveRefreshToken(res.refresh_token);
        const data = jwt_decode(res.token);
        this.tokenStorage.saveUser(data);
        const User = this.tokenStorage.getUser();
        const ro = User.roles;
        if ((ro.indexOf('ROLE_USER') > -1)) {
          this.router.navigate(['pokemons']);
        }
      },
    );
  }
}
