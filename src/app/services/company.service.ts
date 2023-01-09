import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../company';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  }),
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'http://localhost:5000/company';

  constructor(private http:HttpClient) { }

  getCompanies():Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  addCompany(company:Company):Observable<Company>{
    return this.http.post<Company>(this.apiUrl, company, httpOptions);
  }

  getCompany(ico:number):Observable<Company>{
    const url = `${this.apiUrl}?ico=${ico}`;
    return this.http.get<Company>(url);
  }

  updateCompany(ico:number,company:Company):Observable<Company>{
    const url = `${this.apiUrl}/${ico}/`;
    return this.http.put<Company>(url, company, httpOptions);
  }
  
}
