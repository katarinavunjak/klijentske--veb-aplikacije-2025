import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: UserComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
