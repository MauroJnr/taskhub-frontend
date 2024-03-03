import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FloatingDeleteService } from '../floating-delete/floating-delete.service';
import { TasksService } from "../../services/app.service";
@Component({
  selector: 'app-kanban-task',
  templateUrl: './kanban-task.component.html',
  styleUrls: ['./kanban-task.component.css']
})
export class KanbanTaskComponent {
  constructor( private router: Router, private floatingDeleteService:FloatingDeleteService, private tasksService: TasksService) {  }

  @Input()
  public task = {
    idTarea: 1,
    nombre: "Completar informe mensual",
    fechaFin: "2024-02-25",
    descripcion: "El informe mensual debe incluir análisis de ventas y proyecciones para el próximo mes.",
    prioridad: "Alta",
    estado: "Pendiente"
  };

  editarTask(){
    // console.log("Editar")
    console.log(this.task)
    this.tasksService.taskEdit = this.task;
    this.router.navigate(['/main/editartarea']);
  }



  Delete() {

    // this.floatingDeleteService.tituloTarea = this.task.nombre;
    // this.floatingDeleteService.idTarea = this.task.id;
    // console.log(this.task.idTarea)
    // Aquí puedes guardar los cambios en el perfil del usuario
    this.floatingDeleteService.openSuccess(this.task.nombre, this.task.idTarea);

    // Suscribe al observable que indica el estado de la ventana flotante
    this.floatingDeleteService.isOpen$.subscribe(isOpen => {
      if (!isOpen) {
        this.router.navigate(['/main/calendar']); // Cambia 'ruta-deseada' por la ruta a la que quieres redirigir
      }
    });
  }
}
