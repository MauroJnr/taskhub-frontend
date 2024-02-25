import { Component } from '@angular/core';
import { FloatingDeleteService } from './floating-delete.service';

@Component({
  selector: 'app-floating-delete',
  templateUrl: './floating-delete.component.html',
  styleUrls: ['./floating-delete.component.css']
})
export class FloatingDeleteComponent {
  isOpen: boolean = false;

  constructor(private floatingDeleteService: FloatingDeleteService) {
    this.floatingDeleteService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  close() {
    this.floatingDeleteService.closeSuccess();
  }

  getTituloTarea(){
    return this.floatingDeleteService.tituloTarea;
  }

}
