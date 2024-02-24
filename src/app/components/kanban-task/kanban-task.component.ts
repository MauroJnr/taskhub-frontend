import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kanban-task',
  templateUrl: './kanban-task.component.html',
  styleUrls: ['./kanban-task.component.css']
})
export class KanbanTaskComponent {

  @Input()
  public task = {
    id: 1,
    titulo: "Completar informe mensual",
    fecha: "2024-02-25",
    descripcion: "El informe mensual debe incluir análisis de ventas y proyecciones para el próximo mes.",
    prioridad: "Alta",
    estado: "Pendiente"
  };

  editarTask(){
    console.log("Editar")
  }
}
