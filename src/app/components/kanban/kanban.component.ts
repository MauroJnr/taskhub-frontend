import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { TasksService } from 'app/services/app.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent {
  // lista original de tareas

  constructor(private tasksService: TasksService){ // colocar el servicio es private es buena práctica
    // this.tasksService.getDataTasks()
    // console.log(this.allTasks)
  }
  
  async moveTask(dropEvent: CdkDragDrop<any[]>, title:string){
    await this.tasksService.moveTask(dropEvent, title)
  }


  @Input() // el componente recibe la lista de tareas
  public tasks = [
    {
      title: "Pendiente",
      tasks: [
        {
          idTarea: 1,
          nombre: "Completar informe mensual",
          fechaFin: "2024-02-25",
          descripcion: "El informe mensual debe incluir análisis de ventas y proyecciones para el próximo mes.",
          prioridad: "Alta",
          estado: "Pendiente"
        }
      ]
    }
  ];

}
