import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent {

  public task = {
    titulo: "",
    prioridad: "",
    estado: "",
    fechaVencimiento: "",
    descripcion: "",
  }

  crearTarea(){
    console.log(this.task)
  }

}
