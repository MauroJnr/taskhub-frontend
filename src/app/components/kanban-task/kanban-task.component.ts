import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kanban-task',
  templateUrl: './kanban-task.component.html',
  styleUrls: ['./kanban-task.component.css']
})
export class KanbanTaskComponent {

  @Input()
  public task = "Tarea 1"
  // public task = {
  //   name: "Tarea 1"
  // }

}
