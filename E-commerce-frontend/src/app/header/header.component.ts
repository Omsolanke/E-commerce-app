import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public userAuthService:UserAuthService, private router : Router,public userService : UserService){}

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }
  public isAdmin(){
   return  this.userAuthService.isAdmin();
  }
   public isUser(){
   return  this.userAuthService.isUser();
  }
}
