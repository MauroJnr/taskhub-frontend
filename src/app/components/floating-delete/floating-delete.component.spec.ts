import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingDeleteComponent } from './floating-delete.component';

describe('FloatingDeleteComponent', () => {
  let component: FloatingDeleteComponent;
  let fixture: ComponentFixture<FloatingDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloatingDeleteComponent]
    });
    fixture = TestBed.createComponent(FloatingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
