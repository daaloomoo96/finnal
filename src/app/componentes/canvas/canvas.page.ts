import { Component, Input } from '@angular/core';
import  Chart  from 'chart.js/auto';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.page.html',
  styleUrls: ['./canvas.page.scss'],
})
export class CanvasPage  {


@Input("dibujo") donuts:Chart;

  constructor() { }


}
