import { Component } from '@angular/core';
import { TasksService } from "../../services/app.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent {

  constructor(private tasksService: TasksService, private router: Router){
    // console.log(this.task.fechaFin)
  } 

  public task = {
    nombre: "",
    prioridad: "",
    estado: "",
    fechaFin: "",
    descripcion: "",
  }

  prioridadOptions = [
    "Baja",
    "Media",
    "Alta"
  ]

  estadoOptions = [
    { valor: '1', texto: 'Pendiente' },
    { valor: '2', texto: 'En progreso' },
    { valor: '3', texto: 'Terminado' }
  ];

  // fecha:Date = new Date(this.tasksService.taskEdit.fechaFin);
 

  errorMessage = {
    count: 0,
    nombre: {
      text: "",
      mostrar: false
    },
    prioridad: {
      text: "",
      mostrar: false
    },
    estado: {
      text: "",
      mostrar: false
    },
    fechaFin: {
      text: "",
      mostrar: false
    },
  }

  crearTarea(e:any){

    // console.log(e)
    e.preventDefault();

    this.errorMessage.count = 0;
    // validacion nombre
    if(this.task.nombre == "" ){
      this.errorMessage.nombre.text = "El nombre es obligatorio"
      this.errorMessage.nombre.mostrar = true
      this.errorMessage.count++;
    }else{
      this.errorMessage.nombre.text = ""
      this.errorMessage.nombre.mostrar = false
    }

    // validacion prioridad
    if(this.task.prioridad == "" ){
      this.errorMessage.prioridad.text = "La prioridad es obligatoria"
      this.errorMessage.prioridad.mostrar = true
      this.errorMessage.count++;
    }else{
      this.errorMessage.prioridad.text = ""
      this.errorMessage.prioridad.mostrar = false
    }
    // validacion estado
    if(this.task.estado == "" ){
      this.errorMessage.estado.text = "El estado es obligatorio"
      this.errorMessage.estado.mostrar = true
      this.errorMessage.count++;
    }else{
      this.errorMessage.estado.text = ""
      this.errorMessage.estado.mostrar = false
    }
    // validacion fechaFin
    if(this.task.fechaFin == "" || this.task.fechaFin=='NaN-0NaN-0NaNT0NaN:0NaN:00'){
      this.errorMessage.fechaFin.text = "La fecha de vencimiento es obligatoria"
      this.errorMessage.fechaFin.mostrar = true
      this.errorMessage.count++;
    }else{
      let d = new Date(this.task.fechaFin);
      let date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+"T"+((d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString()))+":"+((d.getMinutes().toString().length==2)?d.getMinutes().toString():"0"+(d.getMinutes().toString())+":00");

      this.task.fechaFin = date_format_str;
      this.errorMessage.fechaFin.text = ""
      this.errorMessage.fechaFin.mostrar = false
    }

    // Validacion backend
    if(this.errorMessage.count == 0){
      console.log("Editar tarea")
      // console.log(this.task)
      // redireccionamos
      this.router.navigate(['/main/calendar']);
    }
    console.log(this.task)
  }

}
