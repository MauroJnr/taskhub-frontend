import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { flexibleCompare } from '@fullcalendar/core/internal';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
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
    events: [
      { title: 'Reunión', start: new Date(), id: "1" }
    ]
  };

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
