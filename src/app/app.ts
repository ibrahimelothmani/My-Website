import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DesktopComponent } from './core/components/desktop/desktop.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DesktopComponent],
  template: `<app-desktop></app-desktop>`,
  styles: []
})
export class App {
  title = 'Ibrahim El Othmani - DevOps OS';
}
