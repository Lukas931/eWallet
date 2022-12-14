import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable, lastValueFrom } from 'rxjs';
import {Item} from '../item';
 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  }),
}


@Injectable({
  providedIn: 'root'
})
export class ItemService { 

  private apiUrl = 'http://localhost:5000/items';

  constructor(private http:HttpClient) { }

  getItems():Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getPartOfAllBills(start:number,end:number): Observable<HttpResponse<Item[]>> {
    const url = `${this.apiUrl}?_start=${start}&_end=${end}&_sort=date&_order=desc`;
    return this.http.get<Item[]>(url, {observe: 'response'});
  }

  addItem(item:Item): Observable<Item>{
    return this.http.post<Item>(this.apiUrl, item,httpOptions);
  }

  getItemsInRange(array: number[]):Observable<Item[]>{
    const url = `${this.apiUrl}?date_gte=${array[0]}&date_lte=${array[1]}`;
    return this.http.get<Item[]>(url);
  }

  getDetail(id:number):Observable<Item[]>{
    const url = `${this.apiUrl}?id=${id}`;
    return this.http.get<Item[]>(url);
  }   

  getBillByReceiptId(receiptId:string):Promise<any>{
    
    const url = `${this.apiUrl}?receiptId=${receiptId}`;
    return lastValueFrom(this.http.get<Item[]>(url))
    
  }

  checkReceipt(receipt: string):Promise<any>{
    const url = `${this.apiUrl}?receiptId=${receipt}`;
   
    return(lastValueFrom(this.http.get<Item[]>(url)));
  }
} 
