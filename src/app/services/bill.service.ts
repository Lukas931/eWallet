import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  }),
}

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private eKasaUrl = "https://ekasa.financnasprava.sk/mdu/api/v1/opd/receipt/find";

  constructor(private http:HttpClient) { }

  getBillDetail(bill:any): Observable<any> {
    var billToCheck = {'receiptId':`${bill}`};

    return this.http.post<any>(this.eKasaUrl, billToCheck,httpOptions);
  }


}
