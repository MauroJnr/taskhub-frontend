import { Component } from '@angular/core';
import { TasksService } from "../../services/app.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent {

  constructor(private tasksService: TasksService, private router: Router){
    // console.log(this.task.fechaFin)
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
  d = new Date(this.tasksService.taskEdit.fechaFin);
  date_format_str = this.d.getFullYear().toString()+"-"+((this.d.getMonth()+1).toString().length==2?(this.d.getMonth()+1).toString():"0"+(this.d.getMonth()+1).toString())+"-"+(this.d.getDate().toString().length==2?this.d.getDate().toString():"0"+this.d.getDate().toString())+"T"+((this.d.getHours().toString().length==2?this.d.getHours().toString():"0"+this.d.getHours().toString()))+":"+((this.d.getMinutes().toString().length==2)?this.d.getMinutes().toString():"0"+(this.d.getMinutes().toString())+":00");

  public task = {
    idTarea: this.tasksService.taskEdit.idTarea,
    nombre: this.tasksService.taskEdit.nombre,
    prioridad: this.tasksService.taskEdit.prioridad,
    estado2: this.tasksService.taskEdit.estado,
    estado: "",
    fecha_fin:this.date_format_str,
    descripcion: this.tasksService.taskEdit.descripcion,
    id_usuario: 0
  }

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

  successEdit = {
    text: "",
    mostrar: false
  }

  async editarTarea(e:any){
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
    if(this.task.estado2 == "" ){
      this.errorMessage.estado.text = "El estado es obligatorio"
      this.errorMessage.estado.mostrar = true
      this.errorMessage.count++;
    }else{
      this.errorMessage.estado.text = ""
      this.errorMessage.estado.mostrar = false
    }
    // validacion fechaFin
    if(this.task.fecha_fin == "" || this.task.fecha_fin=='NaN-0NaN-0NaNT0NaN:0NaN:00'){
      this.errorMessage.fechaFin.text = "La fecha de vencimiento es obligatoria"
      this.errorMessage.fechaFin.mostrar = true
      this.errorMessage.count++;
    }else{
      this.errorMessage.fechaFin.text = ""
      this.errorMessage.fechaFin.mostrar = false
    }

    // Validacion backend
    if(this.errorMessage.count == 0){
      this.successEdit.text = "Tarea creada correctamente"
      this.successEdit.mostrar = true;

      console.log("Editar tarea")
      console.log(this.task)
      this.task.estado = (this.task.estado2=="Pendiente") ? ("1"):((this.task.estado2=="En progreso")?("2"):("3"))
      this.task.id_usuario = 1;

      await this.tasksService.editTarea(this.task)

      setTimeout(() => {
        // redireccionamos
        // this.router.navigate(['/main/calendar']);
      }, 1500);
    }
  }
}
