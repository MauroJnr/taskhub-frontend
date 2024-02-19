import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatingSuccessService } from '../floating-success/floating-success.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarperfilComponent {

  nombres:string = 'nombre1 nombre2'
  apellidos:string = 'apellidop apellidom'
  userPassword: string = 'contraUsuario1';

  constructor( private router: Router, private floatingSuccessService:FloatingSuccessService) {  }

  saveChangues() {
    // Aquí puedes guardar los cambios en el perfil del usuario
    this.floatingSuccessService.openSuccess();

    // Suscribe al observable que indica el estado de la ventana flotante
    this.floatingSuccessService.isOpen$.subscribe(isOpen => {
      if (!isOpen) {
        this.router.navigate(['/main']); // Cambia 'ruta-deseada' por la ruta a la que quieres redirigir
      }
    });
  }
  Cancel() {
    this.router.navigate(['/main']);
  }
}
