import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usernameValue: string = 'ejemplo1@correo.com';
  userPassword: string = 'contraUsuario1';


  constructor(private router: Router) { }

  redirectToMain() {
    this.router.navigate(['/main']);
  }


}
