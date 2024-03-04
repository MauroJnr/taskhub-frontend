import { Injectable } from '@angular/core';


interface user {
    usuarioIngreso: string,
    contraseña: string,
    correo: string,
    nombres: string,
    apellidos: string,
}
interface userLogin {
    contraseña: string,
    correo: string,
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
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(usuario),
        })
        .then(response => response.json())
        .catch(err => err);
        // this.tasks = data.tareas;
        console.log(data)
        if(data.mensaje !== undefined){ // se registro
            console.log(data.mensaje)
            console.log(data.usuario)
        }
        // return [this.tasks, this.datos]
    }

    async loginUser(usuario:userLogin){
        let data = await fetch("http://localhost:8080/taskhub/v1/usuarios/login",{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(usuario)
        })
        .then(response => response.json())
        .catch(err => err);
        // this.tasks = data.tareas;
        // console.log(data);
        if(data.token !== undefined){ // se logeo
            // console.log(data.token)
            localStorage.setItem('token_taskhub', data.token)
            return 0;
            // console.log(data.usuario)
        }
        return 1;
    }

    async editUser(usuario:any){
        let token = localStorage.getItem('token_taskhub')
        let data = await fetch(`http://localhost:8080/taskhub/v1/usuarios/1`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authotization':`Bearer ${token}`
            },
            body:JSON.stringify(usuario)
        })
        .then(response => response.json())
        .catch(err => err);
        // this.tasks = data.tareas;
        // console.log(data);
        if(data.usuario !== undefined){ // se logeo
            console.log(data.usuario)
            // console.log(data.token)
            // localStorage.setItem('token_taskhub', data.token)
            return 0;
        }
        return 1;
    }

}