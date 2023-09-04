import { Component } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  user = {
    username: '',
    email: '',
    password: '',
    role: 'client' // Default role
  };
  roles = ['client', 'Fournisseur']; 
  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.user).subscribe(
      (response) => {
        // Handle successful registration, e.g., redirect to login page
      },
      (error) => {
        // Handle registration error, e.g., display error message
      }
    );
  }
}
