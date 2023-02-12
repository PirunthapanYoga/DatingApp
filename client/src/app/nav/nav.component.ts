import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

//Of() accepts null initialization to the observer currentUser$
export class NavComponent implements OnInit{
  model: User | any = {};

  constructor(public accountServices : AccountService) {}

  ngOnInit(): void {

  }

  // make model null will remove last entred user info from the input at the login process.
  login() {
    this.accountServices.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error) 
    });
  }

  logout(){
    this.accountServices.logout();
  }
}
