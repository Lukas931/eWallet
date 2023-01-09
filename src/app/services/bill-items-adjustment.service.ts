import { Injectable } from '@angular/core';

import { BillItem } from 'src/app/bill-item';

export interface LooseObject {
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class BillItemsAdjustmentService {

  constructor() { }

  keyValueItemObj(items:BillItem[]){
    let itemsObj:LooseObject = {};
    for (const bill of items) {
      if(bill.date){
        for(const item of bill.items){
          let dateTime = bill.date
          let pricePerItem = item.price / item.quantity;
          pricePerItem = Math.round((pricePerItem + Number.EPSILON) * 100) / 100;
          let obj = {[dateTime]:pricePerItem};
         
          if(itemsObj[item.name] != undefined) {
            if(!itemsObj[item.name]['prices']?.some((item:any) => item[dateTime] === pricePerItem)){
              itemsObj[item.name]['prices']?.push(obj);
            }
          } else {
            itemsObj[item.name] = {'prices': Array()};
            itemsObj[item.name]['prices']?.push(obj);
          }
        }
        for(const key in itemsObj){
          if(itemsObj[key].prices.length > 1){
            itemsObj[key].prices.sort((a:any,b:any) => Number(Object.keys(b)[0]) - Number(Object.keys(a)[0]));
          }
          if(itemsObj[key].prices.length > 1){
            let lastItem = itemsObj[key].prices.length - 1;
            let firstValue = Object.values(itemsObj[key].prices[0])[0];
            let lastValue = Object.values(itemsObj[key].prices[lastItem])[0];
            let diff = (firstValue as number) - (lastValue as number);
            itemsObj[key]['diff'] = Math.round((diff + Number.EPSILON) * 100) / 100;
          }
        }
      }
    }
    Object.fromEntries(Object.entries(itemsObj).sort((a,b)=>a[0].localeCompare(b[0])));
    return itemsObj;
  }
}
