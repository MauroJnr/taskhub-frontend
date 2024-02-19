import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kanban-list',
  templateUrl: './kanban-list.component.html',
  styleUrls: ['./kanban-list.component.css']
})
export class KanbanListComponent {
  
  @Input()
  public heroNames: string[] = ['Spiderman','Ironman','Hulk','She Hulk', 'Thor'];
}
