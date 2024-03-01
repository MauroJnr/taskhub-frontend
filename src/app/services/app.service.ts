import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import Task from 'app/interfaces/task';
// import {  }
@Injectable({
    providedIn: 'root' 
})
export class TasksService {
    public tasks:Task[] = [];
    public tasksFiltro:Task[] = [];
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
        let data = await fetch("http://localhost:8080/taskhub/v1/tareas/1")
        .then(response => response.json())
        .catch(err => err)
        this.tasks = data.tareas;

        for (const task of this.tasks) {
            task.fechaFin = new Date(task.fechaFin).toDateString();

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
        // console.log(this.datos);
        this.loading = false;
        // console.log(this.loading);
        return [this.tasks, this.datos]
    }

    async getDeleteTarea(id:number){
        await fetch(`http://localhost:8080/taskhub/v1/tareas/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .catch(err => err)

        this.tasks = this.tasks.filter(task => task.idTarea !== id);
        this._tasks.next(this.tasks); // emitimos el evento con el cambio en la lista de tareas

        // return "Tarea eliminada"
    }

    async filtrarTareas(id:number, fechaInicio:string, fechaFin:string){
        let data = await fetch(`http://localhost:8080/taskhub/v1/tareas/filtrar/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                fechaInicio: fechaInicio, // "2024-02-19T20:36:11.604+00:00",
                fechaFin: fechaFin, //"2025-02-26T20:36:11.604+00:00"
            }),
            headers: { // enviamos la data en formato JSON
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .catch(err => err)

        this.tasksFiltro = data.tareas;
        this._tasksFiltro.next(this.tasksFiltro);

    }

    moveTask(dropEvent: CdkDragDrop<any[]>): void{
        // previousContainer: anterior contenedor del elemento
        // container: Actual contenedor del elemento
        const { previousContainer, container, previousIndex, currentIndex } = dropEvent;
        const isSameContainer = previousContainer === container;
        
        // si se mantiene en el mismo contenedor y el mismo lugar
        if (isSameContainer && previousIndex === currentIndex) {
            return;
        }
        
        isSameContainer  
            ? moveItemInArray(container.data, previousIndex, currentIndex) // si es el mismo contenedor, cambia de posicion
            : transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex) // si es otro contenedor, se cambia a ese contenedor
    }

    
}