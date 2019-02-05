import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;    // This allows us to communicate to the 'editForm' form on the page
  user: User;
  @HostListener('window:beforeunload', ['$event'])  // This adds a listener for the window beforeunloadEvent
  unLoadNotification($event: any) { // if this is captured it can stop the page unloading, we have no control over how this happens
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private _route: ActivatedRoute,
              private _alertify: AlertifyService) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    console.log(this.user);
    this._alertify.success('Profile Updated');
    // this.editForm.reset();    // this will just change the dirty state of the form
    this.editForm.reset(this.user); // does the same as above but retains the var passed
  }
}
