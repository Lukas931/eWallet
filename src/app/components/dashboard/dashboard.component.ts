import { Component, OnInit,Renderer2, ViewChildren, QueryList, ElementRef } from '@angular/core';

import {Item} from '../../item';
import {BillItem} from '../../bill-item';
import {Company} from '../../company';
import { Category } from '../../category';
import {ItemService} from '../../services/item.service';
import {CompanyService} from '../../services/company.service';
import {BillItemService} from '../../services/bill-item.service';
import {CategoryService } from '../../services/category.service';
import {PopupService } from '../../services/popup.service';

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

  dateLabels: string[] = [];

  paymentType = ['Nic','prijem', 'Vydaj'];
  monthName = ["Januar","Februar","Marec","April","Maj","Jun","Jul","August","September","Oktober","November","December"];

  siteBody = <HTMLInputElement>document.getElementById('main-content');
  companies: Company[] = [];

  companiesObject: LooseObject = {};
  categories: Category[] = [];

  categoriesObject: LooseObject = {};


  @ViewChildren("separator") separators!: QueryList<ElementRef<HTMLInputElement>>;


  constructor(private itemService: ItemService,
              private renderer: Renderer2,
              private companyService: CompanyService,
              private billItemsService:BillItemService,
              private categoryService: CategoryService,
              private popUpService: PopupService,
              private element: ElementRef
              ) { 
    this.renderer.listen('window','click',(e:Event)=> {
      if((e.target as Element).classList.contains('modal-open')){
        this.hideModal();
      }
    });
    this.renderer.listen('window','scroll',(e:Event) => {
      if(this.allowedScrollCount > this.currentScrollCount){
        if(Math.ceil(window.innerHeight + window.scrollY) > (window.document.body.scrollHeight - 2)){
          this.end = this.end + 10;
          this.getPartOfAllBills(this.start, this.end);
          this.currentScrollCount++;
          this.loadPreloader();
        }
      }

    });
    this.months = this.generateMonths();
  }

  ngOnInit(): void {
    this.loadPreloader();
    this.getPartOfAllBills(this.start, this.end);
    this.getRange(this.now);
    this.getCompanies();
    this.getCategories();
    
  }

  ngAfterViewInit(){
    this.separators.changes.subscribe(() => {
      this.separators.toArray().forEach(el => {
         // console.log(el);
      });
    });
  }

  loadPreloader():void {
    this.siteBody.classList.add('loading');
    setTimeout(() => {
      this.siteBody.classList.remove('loading');
    }, 1000)
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
    this.dateLabels = [];
    
    items.forEach(obj => {
     

      var test = obj.date;
      var date = new Date(test);
     // var day = date.getDate();
      var month = date.getMonth();

      if(!this.dateLabels.includes(this.monthName[month]+" "+date.getFullYear())){
        this.dateLabels.push(this.monthName[month]+" "+date.getFullYear());      
      }
      
      if(obj.type === 1){
        this.income += obj.value;
      } 
      if(obj.type === 2){
        this.outcome += obj.value;
      }
    });

    this.items = items;
    this.items = this.items.sort((a,b) =>  b.date - a.date);
    
    return [
            this.items,
            this.outcome,
            this.income
          ];
  }

  sortItemsAsc(event:any){
    this.items = this.items.sort((a,b) => a.date - b.date);
  }

  sortItemsDesc(event:any){
    this.items = this.items.sort((a,b) =>  b.date - a.date);
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
    //this.popUpService.togglePopUpVisibility();
    if(this.showAddForm){
      this.renderer.addClass(document.body, 'modal-open');
    } else {
      this.renderer.removeClass(document.body, 'modal-open');
    }
  }

  hideModal():void {
    this.showAddForm = !this.showAddForm;
    this.renderer.removeClass(document.body, 'modal-open');
  //  this.popUpService.togglePopUpVisibility();
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
        this.companiesObject[company.ico] = company.category;
      });
    });
  }

  getCategories(): void {
    this.categoryService.getCategories()
    .subscribe((items) => {
      this.categories = items;
      this.categoriesObject = {};
      this.categories.forEach((category) => {
        const id = category.id != null ? category.id : null;
        this.categoriesObject[id!] = category.name;
      });
    });
  }

  trackBy(index:number, item:any): number {
    return item.id;
  }

  scrollToMonth(label:string):void {
    
      const classElement = document.getElementsByClassName('end-'+label);
      if(classElement.length > 0){
        classElement[0].scrollIntoView({
          behavior: 'smooth'
        });
      }
 
  }

  isScrolledIntoView():void {
  //  console.log("aaa");
    /*var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    console.log(rect);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;*/
  }
}
