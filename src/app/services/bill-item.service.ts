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
    const url = `${this.apiUrl}?billId=${receiptId}`;
    return this.http.get<BillItem[]>(url);
  }

  addItem(item:BillItem): Observable<BillItem>{
    return this.http.post<BillItem>(this.apiUrl, item,httpOptions);
  }

  getAll():Observable<BillItem[]>{
    return this.http.get<BillItem[]>(this.apiUrl);
  }

  /*getAllItem():Promise<BillItem[]>{
    return this.http.get<BillItem[]>(this.apiUrl);
  }*/

  updateItem(id:any,item:BillItem) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<BillItem>(url, item, httpOptions);
  }

  /*updateCompany(ico:number,company:Company):Observable<Company>{
    const url = `${this.apiUrl}/${ico}/`;
    return this.http.put<Company>(url, company, httpOptions);
  }*/
}
