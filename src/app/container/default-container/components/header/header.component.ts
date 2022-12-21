import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  //função que administra o tema da aplicação. Vinculado ao input.
  switchTheme(event: Event): void {
    document.documentElement.setAttribute(
      'data-theme',
      Reflect.get(event.target!, 'checked') ? 'dark' : 'light'
    );
  }
}
