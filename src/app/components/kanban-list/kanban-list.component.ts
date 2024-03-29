import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kanban-list',
  templateUrl: './kanban-list.component.html',
  styleUrls: ['./kanban-list.component.css']
})
export class KanbanListComponent {
  
  @Input() // el componente recibe la lista de tareas
  public tasks = [{
      idTarea: 1,
      nombre: "Completar informe mensual",
      fechaFin: "2024-02-25",
      descripcion: "El informe mensual debe incluir análisis de ventas y proyecciones para el próximo mes.",
      prioridad: "Alta",
      estado: "Pendiente"
    }
  ];

  @Input()
  title = ""

}
