import { Injectable } from '@angular/core';


interface user {
    usuarioIngreso: string,
    contraseña: string,
    correo: string,
    nombres: string,
    apellidos: string,
}

@Injectable({
    providedIn: 'root' 
})
export class UserService {

    
    // public userBody = {
    //     usuarioIngreso: "",
    //     contraseña: "",
    //     correo: "",
    //     nombres: "",
    //     apellidos: ""
    // };

    async registerUser(usuario:user){
        let data = await fetch("http://localhost:8080/taskhub/v1/usuarios/signup",{
            method: 'POST',
            body:JSON.stringify({
                usuarioIngreso: "usuario1",
                contraseña: "contraUsuario1",
                correo: "ejemplo1@correo.com",
                nombres: "Lionel",
                apellidos: "Messi"
            }),
        })
        // .then(response => response.json())
        // .catch(err => err)
        // this.tasks = data.tareas;
        console.log(data)
        // if(data.mensaje !== undefined){ // se registro
        //     console.log(data.mensaje)
        // }
        // return [this.tasks, this.datos]
    }

}