import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  @Input() errorMessage?: string = 'Hey, cette page n\'existe pas !';
  message?: string;

  constructor() {
  }

  ngOnInit(): void {
    this.message = this.errorMessage;
  }

}
