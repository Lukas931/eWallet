import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Item} from '../../item';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {

  @Input() item!: Item;



  constructor() {

  }

  ngOnInit(): void {}

  

}
