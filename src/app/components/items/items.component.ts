import { Component, OnInit, ElementRef } from '@angular/core';
import { BillItemService } from 'src/app/services/bill-item.service';
import { BillItem } from 'src/app/bill-item';
import { Item } from 'src/app/item';
import { ItemService } from 'src/app/services/item.service';
import { BillItemsAdjustmentService } from 'src/app/services/bill-items-adjustment.service';

export interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  objectKeys = Object.keys;
  objectValues = Object.values;
  
  billItems: BillItem[] = [];
  primaryItemsObject: LooseObject = {};
  secondaryItemsObject: LooseObject = {};
  thirdItemsObject: LooseObject = {};
  alphabet: Array<string> = [];

  constructor(
    private billItemsService:BillItemService,
    private itemService:ItemService,
    private billItemAjustement:BillItemsAdjustmentService,
    private elem: ElementRef
  ) { }

  ngOnInit():void {
    this.getAllBillsItems();
    this.alphabet = this.generateAlbhabet();
  }

  getAllBillsItems():void {
    this.billItemsService.getAll().subscribe(
      (items) => {
        this.primaryItemsObject = this.billItemAjustement.keyValueItemObj(items);
        
        this.secondaryItemsObject = this.primaryItemsObject;
        console.log(this.secondaryItemsObject);

        console.log(Object.keys(this.primaryItemsObject).length);
        console.log(Math.ceil(Object.keys(this.primaryItemsObject).length / 10));

        console.log(Array.from(Array(Math.ceil(Object.keys(this.primaryItemsObject).length / 10)).keys()));
      } 
    );
  }

  /* just quick fix for data without date value */
  async updateBillItems(bill:BillItem):Promise<any> {
    const item = await this.itemService.getBillByReceiptId(bill.billId);
    if(item.length > 0) {
      if(item[0].date) {
        bill.date = item[0].date
        this.billItemsService.updateItem(bill['id'], bill).subscribe();
      }
    }
  }

  generateAlbhabet(): Array<string> {
    const alpha = Array.from(Array(26)).map((e,i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    return alphabet;
  }

  showDetail(event:any){
    if(event.currentTarget.parentElement.classList.contains('is-selected')){
      event.currentTarget.parentElement.classList.remove("is-selected");
    } else {
      let elements = this.elem.nativeElement.querySelectorAll('.is-selected');
      if(elements.length > 0) {
        elements[0].classList.remove('is-selected');
      }
      event.currentTarget.parentElement.classList.add("is-selected");
    }
  }

  filterByLetter(letter:string): LooseObject {
    if(letter != 'all') {
      if(this.alphabet.includes(letter)){
        this.secondaryItemsObject = {};
        for(const key in this.primaryItemsObject){
          if(key.toUpperCase()[0] === letter.toUpperCase()){
            this.secondaryItemsObject[key] = this.primaryItemsObject[key];
          }
        }
      }
    } else {
      this.secondaryItemsObject = this.primaryItemsObject;
    }
    return this.secondaryItemsObject;
  }

}
