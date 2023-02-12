import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  @Output() cancleRegister = new EventEmitter();
  model: User | any ={}
  
  ngOnInit(): void {}

  constructor(private accountService : AccountService ) {}

  register(){
    this.accountService.register(this.model).subscribe({
      next: response => {
        this.cancel();
      },

      error: error => console.error()
    })
  }

  cancel(){
   this.cancleRegister.emit(false);
  }

}
