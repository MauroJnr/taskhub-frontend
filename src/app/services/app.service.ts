import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Injectable({
    providedIn: 'root' 
})
export class TasksService {
    
    public tasks = [
        {
            id: 1,
            titulo: "Completar informe mensual",
            fecha: "2024-02-25",
            descripcion: "El informe mensual debe incluir análisis de ventas y proyecciones para el próximo mes.",
            prioridad: "Alta",
            estado: "Pendiente"
        },
        {
            id: 2,
            titulo: "Reunión con el equipo de desarrollo",
            fecha: "2024-02-28",
            descripcion: "Discutir los avances del proyecto y asignar nuevas tareas.",
            prioridad: "Media",
            estado: "Pendiente"
        },
        {
            id: 3,
            titulo: "Enviar propuesta de proyecto al cliente",
            fecha: "2024-03-05",
            descripcion: "El cliente ha solicitado una propuesta detallada para el nuevo proyecto.",
            prioridad: "Alta",
            estado: "En progreso"
        },
        {
            id: 4,
            titulo: "Actualizar la base de datos de clientes",
            fecha: "2024-03-10",
            descripcion: "Es importante mantener actualizada la información de los clientes para futuras comunicaciones.",
            prioridad: "Baja",
            estado: "Terminado"
        },
        {
            id: 5,
            titulo: "Actualizar la base de datos",
            fecha: "2024-03-10",
            descripcion: "Es importante mantener actualizada la información de los clientes para futuras comunicaciones.",
            prioridad: "Baja",
            estado: "Terminado"
        },
        {
            id: 6,
            titulo: "Actualizar la base de datos de clientes",
            fecha: "2024-03-10",
            descripcion: "Es importante mantener actualizada la información de los clientes para futuras comunicaciones.",
            prioridad: "Alta",
            estado: "En progreso"
        }
    ];
    
    public tasksPendiente = this.tasks.filter(task => task.estado == "Pendiente");
    public tasksProgreso = this.tasks.filter(task => task.estado == "En progreso");
    public tasksTerminado = this.tasks.filter(task => task.estado == "Terminado");
    // public allTasks = [this.tasksPendiente, this.tasksProgreso, this.tasksTerminado]
    public allTasks = [
        {
            title: "Pendiente",
            tasks: this.tasksPendiente
        },
        {
            title: "En progreso",
            tasks: this.tasksProgreso,
        },
        {
            title: "Terminado",
            tasks: this.tasksTerminado
        }
    ]

    moveTask(dropEvent: CdkDragDrop<any[]>): void{

        // previousContainer: anterior contenedor del elemento
        // container: Actual contenedor del elemento
        const { previousContainer, container, previousIndex, currentIndex } = dropEvent;

        const isSameContainer = previousContainer === container;
        
        // si se mantiene en el mismo contenedor y el mismo lugar
        if (isSameContainer && previousIndex === currentIndex) {
            return;
        }
        
        // console.log("container", container)
        // console.log("previuscontainer",previousContainer)

        isSameContainer  
            ? moveItemInArray(container.data, previousIndex, currentIndex) // si es el mismo contenedor, cambia de posicion
            : transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex) // si es otro contenedor, se cambia a ese contenedor
    }

}