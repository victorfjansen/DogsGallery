import { Component, OnInit } from '@angular/core';

// renderiza o routerOutlet e implementa o notifier container globalmente
@Component({
  selector: 'app-root',
  template:
    '<router-outlet></router-outlet> <notifier-container></notifier-container>',
})
export class AppComponent implements OnInit {
  //ao iniciar, define o data-theme como light
  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}
