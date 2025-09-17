import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';

import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule, RouterLink, NgFor,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSelectModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  password = '';
  repeatPassword = '';
  firstName = '';
  lastName = '';
  phone = '';
  address = '';
  favouriteGenres: string[] = [];

  
  genres = ['Drama', 'Comedy', 'Action', 'Horror', 'Sci-Fi', 'Romance', 'Animation', 'Adventure'];

  constructor(private router: Router, private userService: UserService) {}

  doSignup() {
    if (!this.email || !this.password) {
      alert('Email i lozinka su obavezni!');
      return;
    }
    if (this.password !== this.repeatPassword) {
      alert('Lozinke se ne poklapaju!');
      return;
    }

    const user: UserModel = {
      id: Date.now(),
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      favouriteGenres: this.favouriteGenres,
      cart: []
    };

    const ok = this.userService.register(user);
    if (!ok) {
      alert('Ovaj email je već zauzet.');
      return;
    }
    alert('Registracija uspešna! Prijavite se.');
    this.router.navigate(['/login']);
  }
}

