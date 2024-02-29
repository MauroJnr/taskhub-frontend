import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { flexibleCompare } from '@fullcalendar/core/internal';
import { TasksService } from 'app/services/app.service';
import { ChangeDetectorRef } from '@angular/core';
import Task from 'app/interfaces/task';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  constructor(private tasksService: TasksService){ // colocar el servicio es private es buena práctica
    this.getData();
    // this.cdr.detectChanges();
    // this.tasksService.getData();
    console.log(this.dataCalendar)
  }

  ngOnInit(){
    this.tasksService.taskObservable.subscribe(tasks => {
      console.log(tasks);
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
  // this.tasksService.tasks.map((e:any)=> {
  //   return { title: e.nombre, start: new Date(e.fechaFin), id: e.idTarea }
  // })

  

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
  


  async getData(){
    let datos = await this.tasksService.getData();
    this.dataCalendar = datos[0];
    console.log(this.tasksService.loading)
    let eventos = []
    eventos = datos[0].map((e:any)=> {
      return { title: e.nombre, start: new Date(e.fechaFin), id: e.idTarea }
    });
    console.log(eventos)
    // this.events = eventos;
    this.calendarOptions.events = eventos;
    this.dataKanban = datos[1];
  }


  

  

  clickEvent (info:any) {
    // DOBLE CLICK AL ELEMENTO DEBE ABRIR EL EDITOR DE TAREAS
    info.el.ondblclick = function() {
      console.log('Event: ', info.event);
      console.log('Event: ', info.event.title);
      console.log('Event: ', info.event.start);
      console.log('Event: ', info.event.id);
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

  filtrarTareas(){
    this.calendar = false;
    this.kanban = false;
    this.filtro = true;
  }

}
