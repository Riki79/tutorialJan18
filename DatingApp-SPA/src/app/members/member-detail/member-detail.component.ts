import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  constructor(private _userService: UserService,
                private _alertify: AlertifyService,
                private _route: ActivatedRoute) { }

  ngOnInit() {
    // If I was getting this data while the page was loading it would come up with errors (as the this.userobject would be null)
    // now I'm using the router which has a resolver the user details are being got before the page is loaded, thus user should not be null.
    this._route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  // loadUser() {
  //   // The plus on the start of a string will convert to a number
  //   this._userService.getUser(+this._route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this._alertify.error(error);
  //   });
  // }
}
