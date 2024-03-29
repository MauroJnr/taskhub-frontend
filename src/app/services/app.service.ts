import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Observable } from 'rxjs';
import Task from 'app/interfaces/task';
// import {  }
@Injectable({
    providedIn: 'root' 
})
export class TasksService {
    public tasks:Task[] = [];
    public tasksFiltro:Task[] = [];
    public taskEdit:Task={
        idTarea: 0,
        nombre: "",
        prioridad: "",
        estado: "",
        fechaFin: "",
        fechaFinDate: "",
        descripcion: "",
    };
    // observable
    private _tasks:BehaviorSubject<Task[]>;
    private _tasksFiltro:BehaviorSubject<Task[]>;

    constructor(){
        this._tasks = new BehaviorSubject<Task[]>([]);
        this._tasksFiltro = new BehaviorSubject<Task[]>([]);
    }

    get taskObservable(){ // retornamos el subject como un observable para que los demás puedan suscribirse
        return this._tasks.asObservable();
    }
    
    get taskFiltroObservable(){ // retornamos el subject como un observable para que los demás puedan suscribirse
        return this._tasksFiltro.asObservable();
    }

    public loading: boolean = true;
    public datos: any = [
        {
            title: "Pendiente",
            tasks: this.tasks.filter(task => task.estado == "Pendiente")
        },
        {
            title: "En progreso",
            tasks: this.tasks.filter(task => task.estado == "En progreso")
        },
        {
            title: "Terminado",
            tasks: this.tasks.filter(task => task.estado == "Terminado")
        }
    ];


    async getData(){
        let token = localStorage.getItem('token_taskhub')
        let dataUser:string = ((localStorage.getItem('user_taskhub')==null) ? "" : String(localStorage.getItem('user_taskhub')));
        let userid = JSON.parse(dataUser).idUsuario;
        let data = await fetch(`http://localhost:8080/taskhub/v1/tareas/${userid}`,{
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        .then(response => response.json())
        .catch(err => err)

        // console.log(data)

        if(data.tareas){
            this.tasks = data.tareas;

            for (const task of this.tasks) {
                let d = new Date(task.fechaFin);
                let date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+"T"+(((d.getHours()+5).toString().length==2?(d.getHours()+5).toString():"0"+(d.getHours()+5).toString()))+":"+((d.getMinutes().toString().length==2)?d.getMinutes().toString():"0"+(d.getMinutes().toString())+":00");

                // task.fechaFin = new Date(task.fechaFin).toDateString() + "" + new Date(task.fechaFin).toLocaleTimeString(); // .toDateString()
                task.fechaFinDate = date_format_str; 
                task.fechaFin = new Date(task.fechaFin).toDateString(); // .toDateString()

                if(task.estado == "1"){
                    task.estado = "Pendiente"
                }else if(task.estado == "2"){
                    task.estado = "En progreso"
                }else{
                    task.estado = "Terminado"
                }
            }

            this.datos = [
                {
                    title: "Pendiente",
                    tasks: this.tasks.filter(task => task.estado == "Pendiente")
                },
                {
                    title: "En progreso",
                    tasks: this.tasks.filter(task => task.estado == "En progreso")
                },
                {
                    title: "Terminado",
                    tasks: this.tasks.filter(task => task.estado == "Terminado")
                }
            ]
        }else{
            this.datos = [
                {
                    title: "Pendiente",
                    tasks: this.tasks.filter(task => task.estado == "Pendiente")
                },
                {
                    title: "En progreso",
                    tasks: this.tasks.filter(task => task.estado == "En progreso")
                },
                {
                    title: "Terminado",
                    tasks: this.tasks.filter(task => task.estado == "Terminado")
                }
            ]
        }
        // console.log(this.datos);
        this.loading = false;
        // console.log(this.loading);
        return [this.tasks, this.datos]
    }

    async getDeleteTarea(id:number){
        let token = localStorage.getItem('token_taskhub')
        await fetch(`http://localhost:8080/taskhub/v1/tareas/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        .then(response => response.json())
        .catch(err => err)

        this.tasks = this.tasks.filter(task => task.idTarea !== id);
        this._tasks.next(this.tasks); // emitimos el evento con el cambio en la lista de tareas

        // return "Tarea eliminada"
    }

    async filtrarTareas(id:number, fechaInicio:string, fechaFin:string){
        let token = localStorage.getItem('token_taskhub')
        let data = await fetch(`http://localhost:8080/taskhub/v1/tareas/filtrar/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                fechaInicio: fechaInicio, // "2024-02-19T20:36:11.604+00:00",
                fechaFin: fechaFin, //"2025-02-26T20:36:11.604+00:00"
            }),
            headers: { // enviamos la data en formato JSON
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .catch(err => err)

        this.tasksFiltro = data.tareas;
        this._tasksFiltro.next(this.tasksFiltro);

    }

    async crearTarea(tarea:any){
        let token = localStorage.getItem('token_taskhub')
        let data = await fetch("http://localhost:8080/taskhub/v1/tareas", {
            method: 'POST',
            body: JSON.stringify(tarea),
            headers: { // enviamos la data en formato JSON
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .catch(err => err)
        // console.log(data)
        // console.log(data.tarea)
    }

    async editTarea(tarea:any){
        let token = localStorage.getItem('token_taskhub')
        let data = await fetch(`http://localhost:8080/taskhub/v1/tareas/${tarea.idTarea}`, {
            method: 'PUT',
            body: JSON.stringify(tarea),
            headers: { // enviamos la data en formato JSON
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization':`Bearer ${token}`
            }
        })
        .then(response => response.json())
        .catch(err => err)
        console.log(data)
        console.log(data.tarea)
    }

    // title el nombre de la lista a la que se movio
    async moveTask(dropEvent: CdkDragDrop<any[]>, title:string){
        // console.log(title)
        // previousContainer: anterior contenedor del elemento
        // container: Actual contenedor del elemento
        const { previousContainer, container, previousIndex, currentIndex } = dropEvent;
        const isSameContainer = previousContainer === container;
        
        // si se mantiene en el mismo contenedor y el mismo lugar
        if (isSameContainer && previousIndex === currentIndex) {
            return;
        }
        
        console.log("anterior");
        console.log(previousContainer.data);
        console.log(previousIndex);

        console.log("Nuevo");
        console.log(container.data);
        console.log(currentIndex);

        // moveItemInArray(container.data, previousIndex, currentIndex) // si es el mismo contenedor, cambia de posicion
        // transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex) // si es otro contenedor, se cambia a ese contenedor
        isSameContainer  
            ? moveItemInArray(container.data, previousIndex, currentIndex) // si es el mismo contenedor, cambia de posicion
            : await this.updateTaskEstado(previousContainer.data, container.data, previousIndex, currentIndex, title) // si es otro contenedor, se cambia a ese contenedor
    }

    async updateTaskEstado(anterior:any, nuevo:any, indexAnterior:number, indexActual:number, title:string){
        transferArrayItem(anterior, nuevo, indexAnterior, indexActual)
        // console.log(nuevo.data)
        // console.log(nuevo.data[indexActual].idTarea)

        let taskId = nuevo[indexActual].idTarea;
        let task = this.tasks.filter(task => task.idTarea === taskId)[0];
        // console.log(task)
        // this.tasks.map((task:any) => {
        //     if(task.idTarea !== taskId)
        // })
        
        let d = new Date(task.fechaFin);
        let date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+"T"+((d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString()))+":"+((d.getMinutes().toString().length==2)?d.getMinutes().toString():"0"+(d.getMinutes().toString())+":00");

        console.log({
            idTarea: taskId,
            nombre:task.nombre,
            descripcion:task.descripcion,  
            fecha_fin:date_format_str,
            prioridad:task.prioridad,
            estado: (title=="Pendiente") ? ("1"):((title=="En progreso")?("2"):("3")),
            id_usuario: nuevo[indexActual].idUsuario,
        })
        await this.editTarea({
            idTarea: taskId,
            nombre:task.nombre,
            descripcion:task.descripcion,  
            fecha_fin:task.fechaFin,
            prioridad:task.prioridad,
            estado: (title=="Pendiente") ? ("1"):((title=="En progreso")?("2"):("3")),
            id_usuario: nuevo[indexActual].idUsuario,
        });
    }
}