import { Component } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
    id : '0'
  };

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        const credentialsJSON = JSON.stringify(response);
        sessionStorage.setItem('credentials', credentialsJSON);
        console.log(response) 
        window.location.href = '/dashboard';
      },
      (error) => {
        // Handle login error, e.g., display error message
      }
    );
  }
}
