import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-register',
  imports: [MatButtonModule, MatInputModule, FormsModule, MatCardModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
hidePassword: any;

  constructor(private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerUser(registerForm: NgForm) {
    console.log(registerForm.value);
    this.userService.registerUser(registerForm.value).subscribe(
      (response: any) => {
        this.router.navigate(['/login']);
        registerForm.reset();
      },
      (error: any) => {
        console.error("Error registering user", error);
      }
    );
  }
  
}
