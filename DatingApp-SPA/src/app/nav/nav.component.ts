import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  model: any = {};

  ngOnInit() {
  }

  login() {
    this._authService.login(this.model).subscribe(next => {
        console.log('Logged In', next);
      }, error => {
        console.log('Failed to Login', error);
      });
  }

}
