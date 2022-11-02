import { Component, OnInit,Renderer2, ViewChild  } from '@angular/core';
/*
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
*/

import {Item} from '../../item';
import {BillItem} from '../../bill-item';
import {Company} from '../../company';
import {ItemService} from '../../services/item.service';

import {CompanyService} from '../../services/company.service';
import {BillItemService} from '../../services/bill-item.service';

export interface LooseObject {
  [key: number]: any
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Item[] = [];
  income: number = 0;
  outcome: number = 0;
  allowedScrollCount:number = 0;
  currentScrollCount:number = 1;
  start: number = 0;
  end: number = 10;
  showAddForm: boolean = false;
  showAll:boolean = false;
  now: Date = new Date();
  months: string[] = [];
  paymentType = ['Nic','prijem', 'Vydaj'];

  test:number = 0;

  companies: Company[] = [];

  test2:BillItem = {
    billId:"",
    items:[
      {itemType:"",name:"",price:0,quantity:0,vatRate:0}
    ]
  }

  companiesObject: LooseObject = {};


  constructor(private itemService: ItemService,
              private renderer: Renderer2,
              private companyService: CompanyService,
              private billItemsService:BillItemService
              ) { 
    this.renderer.listen('window','click',(e:Event)=> {
      if((e.target as Element).classList.contains('modal-open')){
        this.hideModal();
      }
    });
    this.renderer.listen('window','scroll',(e:Event) => {
    
      if(this.allowedScrollCount > this.currentScrollCount){

        if(Math.ceil(window.innerHeight + window.scrollY) > (window.document.body.scrollHeight - 2)){
           
          const siteBody = <HTMLInputElement>document.getElementById('main-content');
          siteBody.classList.add('loading');
          this.end = this.end + 10;
          this.getPartOfAllBills(this.start, this.end);
          this.currentScrollCount++;
          setTimeout(() => {
            siteBody.classList.remove('loading');
          }, 1000)
        }
      }
      
    });
    this.months = this.generateMonths();
  }

  ngOnInit(): void {
    this.getPartOfAllBills(this.start, this.end);
   
    this.getRange(this.now);
    this.getCompanies();
  }

  getAllBills():void {
    this.itemService.getItems().subscribe(
      (items) => (this.processItems(items))
    );
  }

  getPartOfAllBills(start:number, end:number):void {
    this.itemService.getPartOfAllBills(start, end).subscribe(
      (items) => {
        this.allowedScrollCount = Math.ceil(+items.headers.get('x-total-count')! / 10);
        this.processItems(items.body!);
      }
    );
  }

  getBillsInMonth(range:number[]):void {
    this.itemService.getItemsInRange(range).subscribe(
      (items) => {this.processItems(items);}
    );
  }

  processItems(items: Item[]){
    this.income = 0;
    this.outcome = 0;
    this.items = [];
    
    items.forEach(obj => {
      if(obj.type === 1){
        this.income += obj.value;
      } 
      if(obj.type === 2){
        this.outcome += obj.value;
      }
    });

    this.items = items;
   
    return [
            this.items,
            this.outcome,
            this.income
          ];
  }

  sortItemsAsc(event:any){
    this.items = this.items.sort((a,b) => a.text.localeCompare(b.text));
  }

  sortItemsDesc(event:any){
    this.items = this.items.sort((a,b) => b.text.localeCompare(a.text));
  }

  addItem(item:Item,billItems:BillItem) {

    this.itemService.addItem(item).subscribe(
      (item) => {
        this.items.push(item);
        this.processItems(this.items);
      }
    );

    this.billItemsService.addItem(billItems).subscribe();
 
    var isInSystem = this.companies.find(obj => {
      return obj.ico == item.ico
    });
    
    if(isInSystem === undefined || isInSystem === null){
    
      const company = {ico: item.ico, name: item.text};
     
      this.companyService.addCompany(company).subscribe(
        (response) => (this.companies.push(company))
      );
    }
 
   
    this.toggleModal();
  }

  getClick(event:any):void {
    this.toggleModal();
  }

  toggleModal():void{
    this.showAddForm = !this.showAddForm;
    if(this.showAddForm){
      this.renderer.addClass(document.body, 'modal-open');
    } else {
      this.renderer.removeClass(document.body, 'modal-open');
    }
  }

  hideModal():void {
    this.showAddForm = !this.showAddForm;
    this.renderer.removeClass(document.body, 'modal-open');
  }

  getRange(selectedDate: Date): number[]{
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(),1).getTime();
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1,1).getTime();
    return [firstDay,lastDay];
  }

  billsInMonth(event:any):void{
    if(!event){
      this.getAllBills();
    } else {
      const date = new Date(2022,event,1);
      const range = this.getRange(date);
      this.getBillsInMonth(range);
    }
  }

  inRange(x:number,min:number,max:number){
    return x>=min && x<=max;
  }

  generateMonths():string[]{
    const months = [...Array(12).keys()].map(key => new Date(0, key).toLocaleString('default', { month: 'long' }));
    return months;
  }

  getCompanies(): void {
    this.companyService.getCompanies()
    .subscribe((company) => { 
      this.companies = company;

      this.companiesObject = {};
      this.companies.forEach((company) => {
       // console.log(company);
        /*const id = category.id != null ? category.id : null;*/
        //this.companiesObject[company.ico] = company.id;console.log(this.companiesObject);
      });
    });
  }


}
