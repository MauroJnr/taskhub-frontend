import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegistrarseComponent } from "./components/registrarse/registrarse.component";
import { MainCalendarComponent } from './pages/main-calendar/main-calendar.component';
import { EditarperfilComponent } from './components/editarperfil/editarperfil.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'main', component: MainCalendarComponent },
  {path:'editarperfil',component:EditarperfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
