import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgTemplateOutlet,
    MatToolbarModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.userService.getActiveUser() !== null;
  }

  logout() {
    this.userService.logout?.();        
    this.router.navigate(['/login']);
  }
}
