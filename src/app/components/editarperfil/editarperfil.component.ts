import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarperfilComponent {
  usernameValue: string = 'ejemplo1@correo.com';
  userPassword: string = 'contraUsuario1';


  constructor(private router: Router) { }

  redirectToMain() {
    this.router.navigate(['/main']);
  }
}
