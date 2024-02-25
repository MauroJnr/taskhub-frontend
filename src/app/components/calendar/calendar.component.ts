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
    headerToolbar:{
      left: 'title',
      center: 'prev,next',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    weekends: true,
    events: [
      { title: 'Reunión', start: new Date() }
    ]
  };

  calendar:boolean = true;
  kanban:boolean = false;
  filtro:boolean = false

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
