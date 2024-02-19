import { Component } from '@angular/core';
import { FloatingSuccessService } from './floating-success.service';

@Component({
  selector: 'app-floating-success',
  templateUrl: './floating-success.component.html',
  styleUrls: ['./floating-success.component.css']
})
export class FloatingSuccessComponent {
  isOpen: boolean = false;

  constructor(private floatingSuccessService: FloatingSuccessService) {
    this.floatingSuccessService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  close() {
    this.floatingSuccessService.closeSuccess();
  }
}
