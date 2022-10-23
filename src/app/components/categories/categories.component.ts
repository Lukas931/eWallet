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
        console.log(this.categories);
      });
  }

  getCompanies(): void {
    this.companyService.getCompanies()
    .subscribe((company) => {
      this.companies = company;
      console.log(this.companies);
    });
  }

  onDragStart(event: DragEvent):void {
    console.log(`starting`, event);
  }
  onDragOver(event: DragEvent) {
    //console.log('drag over', event);
  }
  onDragEnd(event: DragEvent):void {
    console.log('drag end', event);
    const dragedElement = this.categoryEl?.nativeElement;
    const droppedElement = this.companyEl?.nativeElement;
   // console.log(this.ghostEl?.nativeElement.dataset['id']);
   const companyIco = parseInt(this.companyEl?.nativeElement.dataset['id']);
    console.log(dragedElement);
    this.addCategoryToCompany(companyIco);
  }

  addCategoryToCompany(company:number):void {
   // console.log(company);
    let companyEntity = this.companies?.filter(obj => {
      return obj.ico === company
      console.log(obj);
    });

    console.log(companyEntity);



    //const company = {ico: item.ico, name: item.text};
     
    /*  this.companyService.addCompany(company).subscribe(
        (response) => (this.companies.push(company))
      );*/
  }

}
