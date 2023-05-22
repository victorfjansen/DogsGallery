import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template:
    '<router-outlet></router-outlet> <notifier-container></notifier-container>',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}
