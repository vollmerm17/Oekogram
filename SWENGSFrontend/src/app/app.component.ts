import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  tiles: Tile[] = [
    {text: 'Headline', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Profile Icons', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Write Posts Area', cols: 2, rows: 2, color: 'lightpink'},
    {text: 'Profile', cols: 1, rows: 4, color: 'lightgreen'},
    {text: 'Recent Posts / Search / Profile', cols: 2, rows: 3, color: '#DDBDF1'},
  ];
}





