import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FloatingDeleteService } from '../floating-delete/floating-delete.service';

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

  constructor( private router: Router, private floatingDeleteService:FloatingDeleteService) {  }

  Delete() {
    // Aquí puedes guardar los cambios en el perfil del usuario
    this.floatingDeleteService.openSuccess();

    // Suscribe al observable que indica el estado de la ventana flotante
    this.floatingDeleteService.isOpen$.subscribe(isOpen => {
      if (!isOpen) {
        this.router.navigate(['/main']); // Cambia 'ruta-deseada' por la ruta a la que quieres redirigir
      }
    });
  }
}
