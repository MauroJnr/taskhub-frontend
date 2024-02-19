import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarperfilComponent {

  nombres:string = 'nombre1 nombre2'
  apellidos:string = 'apellidop apellidom'
  userPassword: string = 'contraUsuario1';

  constructor( private router: Router) {  }

  saveChangues() {
    // Aquí puedes guardar los cambios en el perfil del usuario
    this.router.navigate(['/main']);
  }
  Cancel() {
    this.router.navigate(['/main']);
  }
}
