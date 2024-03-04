import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FloatingSuccessService } from '../floating-success/floating-success.service';
import { UserService } from "../../services/app.user.service";
@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarperfilComponent {
  constructor( private router: Router, private floatingSuccessService:FloatingSuccessService, private userService: UserService) {  
    this.successMessage.mostrar=false;
  }

  public user = {
    username: "",
    name: "",
    lastname: "",
    newPassword: "",
    confirmPassword: "",
  }

  redirectToMain() {
    this.router.navigate(['/main/calendar']);
  }

  errorMessage = {
    count: 0,
    username: {
      text: "",
      mostrar: false
    },
    name: {
      text: "",
      mostrar: false
    },
    lastname: {
      text: "",
      mostrar: false
    },
    newPassword: {
      text: "",
      mostrar: false
    },
  }

  successMessage = {
    text: "",
    mostrar: false,
  }

  

  async saveChangues() {
    this.errorMessage.count = 0;
    // validación username
    if(this.user.username == "" ){
      this.errorMessage.username.text = "El nombre de usuario es obligatorio"
      this.errorMessage.username.mostrar = true
      this.errorMessage.count++;
    }else if( this.user.username.length < 3  ){
      this.errorMessage.username.text = "El nombre de usuario debe ser mayor a 3 letras"
      this.errorMessage.username.mostrar = true
      this.errorMessage.count++;
    }else{
      this.errorMessage.username.text = ""
      this.errorMessage.username.mostrar = false
    }

    // validación name
    if(this.user.name == "" ){
      this.errorMessage.name.text = "El nombre es obligatorio"
      this.errorMessage.name.mostrar = true
      this.errorMessage.count++;
    }else if( this.user.name.length < 3  ){
      this.errorMessage.name.text = "El nombre debe ser mayor a 3 letras"
      this.errorMessage.name.mostrar = true
      this.errorMessage.count++;
    }else{
      this.errorMessage.name.text = ""
      this.errorMessage.name.mostrar = false
    }

    // validación lastname
    if(this.user.lastname == "" ){
      this.errorMessage.lastname.text = "El apellido es obligatorio"
      this.errorMessage.lastname.mostrar = true
      this.errorMessage.count++;
    }else if(this.user.lastname.length < 3){
      this.errorMessage.lastname.text = "El apellido debe ser mayor a 3 letras"
      this.errorMessage.lastname.mostrar = true
      this.errorMessage.count++;
    }else{
      this.errorMessage.lastname.text = ""
      this.errorMessage.lastname.mostrar = false
    }

    // validación password
    if(this.user.newPassword.length > 0 || this.user.confirmPassword.length > 0){
      if (this.user.newPassword.length < 3 || this.user.confirmPassword.length < 3){
        this.errorMessage.newPassword.text = "La contraseña debe ser mayor a 3 letras"
        this.errorMessage.newPassword.mostrar = true
        this.errorMessage.count++;
      }else if(this.user.newPassword !== this.user.confirmPassword){
        this.errorMessage.newPassword.text = "Las contraseñas no coinciden"
        this.errorMessage.newPassword.mostrar = true
        this.errorMessage.count++;
      }
    }else{
      this.errorMessage.newPassword.text = ""
      this.errorMessage.newPassword.mostrar = false
    }

    // Aquí puedes guardar los cambios en el perfil del usuario
    // this.floatingSuccessService.openSuccess();

    // Validacion backend
    if(this.errorMessage.count == 0){
      console.log("Login usuario")

      await this.userService.editUser(
        {
          usuarioIngreso: this.user.username,
          contraseña: this.user.newPassword,
          correo: "perez@gmail.com",
          nombres: this.user.name,
          apellidos: this.user.lastname
        }
      );

      this.successMessage.text = "Usuario actualizado correctamente"
      this.successMessage.mostrar = true;

      setTimeout(() => {
        this.redirectToMain();
      }, 1500);

    }
    // Suscribe al observable que indica el estado de la ventana flotante
    // this.floatingSuccessService.isOpen$.subscribe(isOpen => {
    //   if (!isOpen) {
    //     this.router.navigate(['/main/calendar']); // Cambia 'ruta-deseada' por la ruta a la que quieres redirigir
    //   }
    // });
  }

  Cancel() {
    this.router.navigate(['/main/calendar']);
  }

  mostrar: boolean = false; // password
  mostrarConfirm: boolean = false; // Confirm password

  mostrarPass(){
    this.mostrar=true;
    let elemento:any = document.querySelector("[name='password']");
    elemento.type = "text";
  }

  noMostrarPass(){
    this.mostrar=false;
    let elemento:any = document.querySelector("[name='password']");
    elemento.type = "password";
  }

  mostrarPassConfirm(){
    this.mostrarConfirm=true;
    let elemento:any = document.querySelector("[name='confirmPassword']");
    elemento.type = "text";
  }

  noMostrarPassConfirm(){
    this.mostrarConfirm=false;
    let elemento:any = document.querySelector("[name='confirmPassword']");
    elemento.type = "password";
  }


}
