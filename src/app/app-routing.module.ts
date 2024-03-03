import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegistrarseComponent } from "./components/registrarse/registrarse.component";
import { MainCalendarComponent } from './pages/main-calendar/main-calendar.component';
import { EditarperfilComponent } from './components/editarperfil/editarperfil.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EditarTareaComponent } from "./components/editar-tarea/editar-tarea.component";
import { CrearTareaComponent } from "./components/crear-tarea/crear-tarea.component";
import { loginGuard } from './guards/login.guard';
import { editTaskGuard } from './guards/editTask.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'main', component: MainCalendarComponent, children:[
      { path: 'editarperfil', title:"Editar perfil", component: EditarperfilComponent },
      { path: 'calendar', title:"Calendar", component: CalendarComponent },
      { path: 'editartarea', title:"Editar tarea", component: EditarTareaComponent, canActivate:[editTaskGuard] },
      { path: 'creartarea', title:"Crear tarea", component: CrearTareaComponent },
      { path: '', redirectTo: "/main/calendar", pathMatch: 'full'},
    ], 
    canActivate:[loginGuard]
  },
  // {path:'editarperfil',component:EditarperfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
