import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from "./header/header.component";


@Component({
  selector: 'app-root',
  imports: [ HeaderComponent,RouterModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-commerce-app';
}
