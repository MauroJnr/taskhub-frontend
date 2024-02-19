import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent {
  public heroNames: string[] = ['Spiderman','Ironman','Hulk','She Hulk', 'Thor'];


  moveTask(dropEvent: CdkDragDrop<string[]>): void{
    // console.log('even')
    // console.log(this.heroNames)
    const { container, previousIndex, currentIndex } =
      dropEvent;

    if (previousIndex === currentIndex) {
      return;
    }

    // this.heroNames.filter((list) => list !== listToRemove);
    moveItemInArray(this.heroNames, previousIndex, currentIndex);

    // this.reorderTask(
    //   container.data,
    //   previousIndex,
    //   currentIndex
    // )


    // isSameContainer
    //   ? this.kanbanService.reorderTask(
    //       container.data,
    //       previousIndex,
    //       currentIndex
    //     )
    //   : this.kanbanService.transferTask({
    //       fromList: previousContainer.data,
    //       toList: container.data,
    //       fromIndex: previousIndex,
    //       toIndex: currentIndex,
    //     });
  }

  // reorderTask(list: KanbanList, fromIndex: number, toIndex: number): void {
  //   moveItemInArray(list.tasks, fromIndex, toIndex);
  // }
}
