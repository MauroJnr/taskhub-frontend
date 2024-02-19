import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainCalendarComponent } from './pages/main-calendar/main-calendar.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EditarperfilComponent } from './components/editarperfil/editarperfil.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanListComponent } from './components/kanban-list/kanban-list.component';
import { KanbanTaskComponent } from './components/kanban-task/kanban-task.component';
import { FloatingSuccessComponent } from './components/floating-success/floating-success.component';
import { FloatingSuccessService } from './components/floating-success/floating-success.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarseComponent,
    MenuComponent,
    MainCalendarComponent,
    CalendarComponent,
    EditarperfilComponent,
    KanbanComponent,
    KanbanListComponent,
    KanbanTaskComponent,
    FloatingSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    DragDropModule,
  ],
  providers: [FloatingSuccessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
