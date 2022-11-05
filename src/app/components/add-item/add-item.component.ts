import { Component, OnInit, Input, Output, EventEmitter, ViewChild,SimpleChanges } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

import {Item} from '../../item';
import {BillItem} from '../../bill-item';


import {BillService} from '../../services/bill.service';
import {PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @Input() data: any[];
  @Input() showAddForm: boolean = true;
  @Output() onAddItem:EventEmitter<{newItem:Item,newBillItems:BillItem}> = new EventEmitter;

  @ViewChild('action', { static: true }) action!: NgxScannerQrcodeComponent;

  //popUpVisible:boolean = false;

  text: string ="";
  value: number = 0;
  type: number = 0;
  ico: number = 0;
  output: string = "";
  date: number = Date.now();
  receipId: string = "";

  billItems:BillItem = {
    billId:"",
    items:[{
      itemType:"",name:"",price:0,quantity:0,vatRate:0
    }]
  };
  
  constructor( private billService: BillService,
    private popUpService: PopupService
  ) { 
    this.data = Array();
  }

  ngOnInit(): void {
   // this.popUpVisible = this.popUpService.isPopUpVisible;
  }

  ngOnDestroy(){
    this.action.stop();
  }

  getType(event:any):void {
    this.type = event;
  }

  onSubmit(): void {
   
    if(!this.text){
      alert("Prosim vyplne nazov");
    }

    if(this.type === 0){
      alert("Prosim vyberte typ pohybu");
    }
    
    const newItem = {
      text: this.text,
      value: this.value,
      type: Number(this.type),
      date: this.date,
      ico: Number(this.ico),
      receiptId: this.receipId
    }
    const newBillItems = this.billItems;
    
   
    this.onAddItem.emit({newItem,newBillItems});
    this.text = "";
    this.value = 0;
    this.type = 0;
    this.ico = 0;
    this.receipId = "";
  }

  getCode(event:string): void{
    if(event !== null){
      if(event .length != 0){
        this.action.toggleCamera();
        this.getBillInfo(event);
      }
    }
    
  }
  getBillInfo(billCode:string):void {
    var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    this.billService.getBillDetail(billCode).subscribe(
        (response) => {
                       
                        this.text = response.receipt.organization.name;
                        this.value = response.receipt.totalPrice;
                        this.type = 2;
                        this.ico = response.receipt.ico;
                        this.date = new Date(response.receipt.createDate.replace(pattern,'$3-$2-$1')).getTime();
                        this.receipId = response.receipt.receiptId;
                        this.billItems.items = response.receipt.items;
                        this.billItems.billId = response.receipt.receiptId;
                      }
      );
  }

}
