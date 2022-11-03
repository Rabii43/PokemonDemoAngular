import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./auth/services/token-storage.service";
import {pictureImage} from "../api/entryPoint";
import {Router} from "@angular/router";
import {AuthService} from "./auth/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pokemon';
  user: any;
  imaUrl: string = pictureImage;
  vesible?: boolean = this.authservice.isLoggedIn;

  constructor(private tokenService: TokenStorageService,
              private authservice: AuthService
  ) {
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.imaUrl += (this.user.id > 9) ? '0' + this.user.id + '.png' : '00' + this.user.id + '.png'
  }

  logout() {
    this.tokenService.signOut();
  }

}
