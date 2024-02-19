import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingSuccessComponent } from './floating-success.component';

describe('FloatingSuccessComponent', () => {
  let component: FloatingSuccessComponent;
  let fixture: ComponentFixture<FloatingSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloatingSuccessComponent]
    });
    fixture = TestBed.createComponent(FloatingSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
