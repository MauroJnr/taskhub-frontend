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
  public task = "Tarea 1"
  // public task = {
  //   name: "Tarea 1"
  // }

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
