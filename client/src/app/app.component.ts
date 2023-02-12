import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   
  title = 'Dating app';

  constructor(private accountServices: AccountService){}

  ngOnInit(): void{
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString =localStorage.getItem('user');
    if(!userString) return;
    this.accountServices.setCurrentUser(JSON.parse(userString));
  }
}
