import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroFechaTaskComponent } from './filtro-fecha-task.component';

describe('FiltroFechaTaskComponent', () => {
  let component: FiltroFechaTaskComponent;
  let fixture: ComponentFixture<FiltroFechaTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroFechaTaskComponent]
    });
    fixture = TestBed.createComponent(FiltroFechaTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
