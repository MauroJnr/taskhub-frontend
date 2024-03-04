import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/app.user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usernameValue: string = 'ejemplo1@correo.com';
  userPassword: string = 'contraUsuario1';

  constructor(private router: Router, private userService: UserService) { }

  redirectToMain() {
    this.router.navigate(['/main']);
  }

  mostrar: boolean = false; // password

  errorMessage = {
    count: 0,
    email: {
      text: "",
      mostrar: false
    },
    password: {
      text: "",
      mostrar: false
    },
  }

  successMessage = {
    text: "",
    mostrar: false,
  }

  loginErrorMessage = {
    text: "",
    mostrar: false,
  }

  public user = {
    email: "",
    password: "",
  }

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

  async loginUsuario() {
    console.log(this.user)
    console.log(this.errorMessage)
    this.errorMessage.count = 0;

    let regularExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // validación email
    if(this.user.email == "" ){
      this.errorMessage.email.text = "El correo es obligatorio"
      this.errorMessage.email.mostrar = true
      this.errorMessage.count++;
    }else if(!regularExp.test(this.user.email) ){
      this.errorMessage.email.text = "Ingrese un correo válido"
      this.errorMessage.email.mostrar = true
      this.errorMessage.count++;
    }else{
      this.errorMessage.email.text = ""
      this.errorMessage.email.mostrar = false
    }

    // validacion password
    if(this.user.password == "" ){
      this.errorMessage.password.text = "La contraseña es obligatoria"
      this.errorMessage.password.mostrar = true
      this.errorMessage.count++;
    }else{
      this.errorMessage.password.text = ""
      this.errorMessage.password.mostrar = false
    }

    // Validacion backend
    if(this.errorMessage.count == 0){
      console.log("Login usuario")

      let rest = await this.userService.loginUser(
        {
          correo: this.user.email,
          contraseña: this.user.password
        }
      );

      if(rest == 0){
        this.successMessage.text = "Usuario logeado correctamente"
        this.successMessage.mostrar = true;

        this.loginErrorMessage.text = ""
        this.loginErrorMessage.mostrar = false;
        // redireccionamos
        setTimeout(() => {
          this.redirectToMain();
        }, 1500);
      }else{
        this.loginErrorMessage.text = "Credenciales incorrectas"
        this.loginErrorMessage.mostrar = true;
      }
    }
  }
}
