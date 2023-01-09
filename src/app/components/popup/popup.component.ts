import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() customText:string = "";
  @Input() customClass:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
