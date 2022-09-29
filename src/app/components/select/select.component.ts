import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() data: any[];
  @Input() first: string;
  @Input() name: string;
  @Output() customType: any;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor() { 
    this.data = Array();
    this.first = "-";
    this.name = "";
  }

  ngOnInit(): void {
  }

  selectOnChange(targetValue:any):void {
    const value = targetValue.target.value
    this.newItemEvent.emit(value);
  }

}
