import { Component, OnInit,ViewChildren,ElementRef,QueryList } from '@angular/core';
import { Category } from '../../category';
import {Company} from '../../company';

import {CompanyService} from '../../services/company.service';
import {CategoryService } from '../../services/category.service';

import {DragDropModule} from '@angular/cdk/drag-drop';

export interface LooseObject {
  [key: number]: any
}


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  companies?: any[];
  category: number = 0;
  @ViewChildren('companyEl') companyEl!: QueryList<any>;

  categoriesObject: LooseObject = {};

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
      this.categoriesObject = {};
      this.categories.forEach((category) => {
        const id = category.id != null ? category.id : null;
        this.categoriesObject[id!] = category.name;
      });
    });
  }

  getCompanies(): void {
    this.companyService.getCompanies()
    .subscribe((company) => {
      this.companies = company;
    });
  }

  onDragStart(event: DragEvent):void {
    const dragedElement = event?.target as HTMLElement;
    const dragedId = parseInt(dragedElement.getAttribute("data-id")!);
   
    this.category = dragedId;
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  onDragEnd(event: DragEvent):void {
     
    const posLeft = event.clientX;
    const posTop = event.clientY;
    
    this.companyEl.toArray().forEach(val => {
      if( posTop < val?.nativeElement.getBoundingClientRect().bottom && posTop > val?.nativeElement.getBoundingClientRect().top){
        const companyIco = parseInt(val?.nativeElement.dataset['id']);
        this.addCategoryToCompany(companyIco,this.category);
      }
    });
  }

  addCategoryToCompany(company:number,category:number):void {
    this.companies?.filter(obj => {
      if(obj.ico === company){
        if(typeof obj.category === 'undefined') {
          obj.category = [];
          obj.category.push(category);
        } else {
          obj.category.push(category);
        }
      }
    });
  }

}
