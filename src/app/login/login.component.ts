import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private router: Router, private userService: UserService) {
    
    if (this.userService.getActiveUser()) {
      this.router.navigate(['/profile']);
    }
  }

  doLogin() {
    if (this.userService.login(this.email, this.password)) {
      alert('Uspešno ste se prijavili!');
      this.router.navigate(['/profile']);
    } else {
      alert('Pogrešan email ili lozinka.');
    }
  }
}
