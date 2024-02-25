import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isMenuOpen: boolean = false;
  animationState = 'closeMenu';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menu = document.querySelector('.dropdown-menu');
    const userIcon = document.querySelector('.user');

    if (!menu?.contains(target) && !userIcon?.contains(target)) {
      this.isMenuOpen = false;
    }
  }
  // constructor(){
  //   console.log("menu")
  // }
}
