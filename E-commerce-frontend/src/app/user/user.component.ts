import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  standalone: true, // Assuming you are using standalone components
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  
  message: string = '';

  constructor(private userService: UserService) {
    this.forUser();  // Method call must be inside the constructor body
  }

  forUser() {
    this.userService.foeUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
