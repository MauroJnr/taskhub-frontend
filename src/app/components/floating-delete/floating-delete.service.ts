import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloatingDeleteService {
  private isOpenSubject = new Subject<boolean>();
  isOpen$ = this.isOpenSubject.asObservable();

  idTarea = 0;
  tituloTarea = "";

  openSuccess(nombre:string, id: number) {
    this.isOpenSubject.next(true);
    this.idTarea = id;
    this.tituloTarea = nombre
  }

  closeSuccess() {
    this.isOpenSubject.next(false);
  }

  
}