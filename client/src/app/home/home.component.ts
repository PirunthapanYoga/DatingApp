import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  registerMode : boolean =false;
  users: any;

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    this.getuser();
  }

  startRegister(){
    this.registerMode=!this.registerMode;
  }

  cancleRegisterMode(){
    this.registerMode=!this.registerMode;
  }
  
  getuser() {
    this.http.get('https://localhost:5001/api/users/').subscribe({
      next: response => {
        this.users = response,
        console.log(response);
      },
      error: error =>  console.log(error),
      complete: () => console.log("Request hthis.users = response,as Completed"),
    })
  };

}
