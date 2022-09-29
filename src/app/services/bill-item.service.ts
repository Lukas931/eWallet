import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BillItem} from '../bill-item';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  }),
}

@Injectable({
  providedIn: 'root' 
})
export class BillItemService {

  private apiUrl = 'http://localhost:5000/billItems';

  constructor(private http:HttpClient) { }

  getBillItems(receiptId:string):Observable<BillItem[]> {
    
   // var billToCheck = {'receiptId':`${receiptId}`};

    //return this.http.post<BillItem>(this.apiUrl, billToCheck,httpOptions);

    const url = `${this.apiUrl}?billId=${receiptId}`;
    return this.http.get<BillItem[]>(url);
  }


  addItem(item:BillItem): Observable<BillItem>{
    return this.http.post<BillItem>(this.apiUrl, item,httpOptions);
  }
}
