import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  }),
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:5000/categories';

 

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }


  /*addItem(item:Item): Observable<Item>{
    return this.http.post<Item>(this.apiUrl, item,httpOptions);
  }


  getItemsInRange(array: number[]):Observable<Item[]>{
    const url = `${this.apiUrl}?date_gte=${array[0]}&date_lte=${array[1]}`;
    return this.http.get<Item[]>(url);
  }

  getDetail(id:number):Observable<Item[]>{
    const url = `${this.apiUrl}?id=${id}`;
    return this.http.get<Item[]>(url);
  }  */ 
}
 