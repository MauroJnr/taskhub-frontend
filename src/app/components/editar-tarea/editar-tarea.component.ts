import { Component } from '@angular/core';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent {
  public task = {
    titulo: "",
    prioridad: "",
    estado: "",
    fechaVencimiento: "",
    descripcion: "",
  }

  editarTarea(){
    console.log(this.task)
  }
}
