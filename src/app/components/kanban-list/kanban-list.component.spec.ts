import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanListComponent } from './kanban-list.component';

describe('KanbanListComponent', () => {
  let component: KanbanListComponent;
  let fixture: ComponentFixture<KanbanListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KanbanListComponent]
    });
    fixture = TestBed.createComponent(KanbanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
