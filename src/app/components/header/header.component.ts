import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  partOfDay:string = "";

  constructor() { }

  ngOnInit(): void {
    this.partOfDay = this.getPartOfDay();
  }

  getPartOfDay():string {
    const time = new Date();
    var hours = time.getHours();
    var partOfDay = "";
    if(hours < 12 ){
      partOfDay = "morning";
    } else 
    if(hours < 17 ){
      partOfDay = "afternoon";
    } else 
    if(hours < 21){
      partOfDay = "evening";
    } else {
      partOfDay = "night";
    }
    return partOfDay;
  }

}
