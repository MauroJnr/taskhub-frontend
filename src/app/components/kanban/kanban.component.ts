import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { TasksService } from 'app/services/app.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent {
  // lista original de tareas

  constructor(private tasksService: TasksService){ // colocar el servicio es private es buena práctica
    
  }

  get allTasks(){
    return [...this.tasksService.allTasks];
  }

  moveTask(dropEvent: CdkDragDrop<any[]>): void{
    this.tasksService.moveTask(dropEvent)
  }

}
