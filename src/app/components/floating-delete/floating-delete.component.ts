import { Component } from '@angular/core';
import { FloatingDeleteService } from './floating-delete.service';
import { TasksService } from 'app/services/app.service';
@Component({
  selector: 'app-floating-delete',
  templateUrl: './floating-delete.component.html',
  styleUrls: ['./floating-delete.component.css']
})
export class FloatingDeleteComponent {
  isOpen: boolean = false;

  constructor(private floatingDeleteService: FloatingDeleteService, private tasksService: TasksService) {
    this.floatingDeleteService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    // this.getidTarea()
  }

  close() {
    this.floatingDeleteService.closeSuccess();
  }

  getTituloTarea(){
    // console.log(this.floatingDeleteService.tituloTarea)
    return this.floatingDeleteService.tituloTarea;
  }
  // idTarea: number = this.floatingDeleteService.idTarea;

  async deleteTask(){
    await this.tasksService.getDeleteTarea(this.floatingDeleteService.idTarea)

    this.close();
  }
}
