import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { TasksService } from 'app/services/app.service';
import Task from 'app/interfaces/task';
import { Router } from '@angular/router';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  constructor(private tasksService: TasksService, private router: Router){ // colocar el servicio es private es buena práctica
    this.getData();
    // this.cdr.detectChanges();
    // this.tasksService.getData();
    // console.log(this.dataCalendar)
  }

  ngOnInit(){
    this.tasksService.taskObservable.subscribe(tasks => {
      // console.log(tasks);
      this.dataCalendar = tasks;
      let pendiente: Task[] = tasks.filter(task => task.estado == "Pendiente")

      this.dataKanban = [
        {
            title: "Pendiente",
            tasks: this.dataCalendar.filter(task => task.estado == "Pendiente")
        },
        {
            title: "En progreso",
            tasks: this.dataCalendar.filter(task => task.estado == "En progreso")
        },
        {
            title: "Terminado",
            tasks: this.dataCalendar.filter(task => task.estado == "Terminado")
        }
      ]
        

      this.calendarOptions.events = this.dataCalendar.map((e:any)=> {
        return { title: e.nombre, start: new Date(e.fechaFin), id: e.idTarea }
      });

      
    })
  }

  dataKanban:{title:string, tasks:Task[]}[] = [
    {
      title: "Pendiente",
      tasks:[]
    }
  ];

  dataCalendar = this.tasksService.tasks;
  
  events = this.dataCalendar.map((e:any)=> {
    return { title: e.nombre, start: new Date(e.fechaFin), id: e.idTarea }
  });

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    eventClick: (info) => this.clickEvent(info),
    headerToolbar:{
      left: 'title',
      center: 'prev,next',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    weekends: true,
    events: this.events
  };
  
  fechaInicio:string = "";
  fechaFin:string = "";


  async getData(){
    let datos = await this.tasksService.getData();
    this.dataCalendar = datos[0];
    // console.log(this.tasksService.loading)
    let eventos = []
    eventos = datos[0].map((e:any)=> {
      return { title: e.nombre, start: new Date(e.fechaFin), id: e.idTarea }
    });
    // console.log(eventos)
    // this.events = eventos;
    this.calendarOptions.events = eventos;
    this.dataKanban = datos[1];
  }

  clickEvent (info:any) {
    // DOBLE CLICK AL ELEMENTO DEBE ABRIR EL EDITOR DE TAREAS
    let lista = this.tasksService.tasks;
    const func = (task:any) => {
      this.tasksService.taskEdit = task;
      this.router.navigate(['/main/editartarea']);
    }
    info.el.ondblclick = function() {
      // console.log('Event: ', info.event);
      // console.log('Event: ', info.event.title);
      // console.log('Event: ', info.event.start);
      // console.log('Event: ', info.event.id);

      // this.editarTaksSelect();
      console.log(lista)
      console.log(lista.filter((task:any) => task.idTarea == Number(info.event.id))[0])
      func(lista.filter((task:any) => task.idTarea == Number(info.event.id))[0])

    };
    // info.el.style.borderColor = 'red';
  }

  calendar:boolean = true;
  kanban:boolean = false;
  filtro:boolean = false

  // para mostrar las distintas vistas
  mostrarCalendar(){
    this.calendar = true;
    this.kanban = false;
    this.filtro = false;
  }

  mostrarKanban(){
    this.calendar = false;
    this.kanban = true;
    this.filtro = false;
  }

  async filtrarTareas(){

    if (this.fechaInicio == '' || this.fechaFin == ''){
      console.log("Debe seleccionar ambas fechas")
      this.mostrarCalendar();
    }else if(this.fechaInicio > this.fechaFin){
      console.log("La fecha de inicio es mayor a la fecha de fin")
    }else if(this.fechaInicio == this.fechaFin){
      console.log("La fecha de inicio y la fecha de fin son las mismas")
    }
    else{
      this.calendar = false;
      this.kanban = false;
      this.filtro = true;

      let dataUser:string = ((localStorage.getItem('user_taskhub')==null) ? "" : String(localStorage.getItem('user_taskhub')));
      let userid = JSON.parse(dataUser).idUsuario;
      await this.tasksService.filtrarTareas(userid,this.fechaInicio,this.fechaFin);
    }

  }

}
