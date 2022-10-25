import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Category } from '../../category';
import {Company} from '../../company';

import {CompanyService} from '../../services/company.service';
import {CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  companies?: any[];
  category: number = 0;
  @ViewChild('companyEl') companyEl?: ElementRef<any>;
  @ViewChild('categoryEl') categoryEl?: ElementRef<any>;

  constructor(
    private categoryService: CategoryService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getCompanies();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((items) => {
        
        this.categories = items;
     //   console.log(this.categories);
      });
  }

  getCompanies(): void {
    this.companyService.getCompanies()
    .subscribe((company) => {
      this.companies = company;
    //  console.log(this.companies);
    });
  }

  onDragStart(event: DragEvent):void {
   
    const dragedElement = event?.target as HTMLElement;
    const dragedId = parseInt(dragedElement.getAttribute("data-id")!);
   
    this.category = dragedId;
  
  }
  onDragOver(event: DragEvent) {
    //console.log('drag over', event);
  }
  onDragEnd(event: DragEvent):void {
    const droppedElement = this.companyEl?.nativeElement;
   // console.log(droppedElement);
    const companyIco = parseInt(this.companyEl?.nativeElement.dataset['id']);
  
    this.addCategoryToCompany(companyIco,this.category);
  }

  addCategoryToCompany(company:number,category:number):void {
  
    this.companies?.filter(obj => {
   
    if(obj.ico === company){
      if(!Array.isArray(obj.category)){
        obj.category = [];
      }
      if(!obj.category.includes(category)){
        obj.category.push(category);
      }      
      //return obj;
    }
 
    });
    console.log(this.companies);
 
  }

}
