import { Component, OnInit, Renderer2 } from '@angular/core';


import { ActivatedRoute, Router, Event,NavigationEnd,NavigationStart,NavigationError } from '@angular/router';
import { Location } from '@angular/common';

import {Item} from '../../item';
import {BillItem} from '../../bill-item';

import {ItemService} from '../../services/item.service';
import {BillItemService} from '../../services/bill-item.service';


@Component({ 
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css']
})
export class DetailItemComponent implements OnInit {
  items: Item[] = [];
  billItems!: BillItem;
  itemsOfBill!: any;
  displayedColumns: string[] = ['name', 'quantity', 'j.cena','price'];
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private itemService: ItemService,
    private router: Router,
    private renderer: Renderer2,
    private billItemService:BillItemService
  ) { 
    this.router.events.subscribe((event: Event) => {
       //console.log(event);
      if(event instanceof NavigationStart){
        /*setTimeout(() => {
          console.log("aa");
          console.log(document.querySelector('.roller-container'));
            this.renderer.removeClass(document.querySelector('.roller-container'),'show');
        },2000)*/
      }
      if(event instanceof NavigationEnd){
        this.getDetail();

        setTimeout(() => {
           // this.renderer.removeClass(document.querySelector('.roller-container'),'hide');
        },1000)
      }
      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar

        // Present error to user
        console.log(event.error);
      }
    })
  }

  ngOnInit(): void {

   // this.getDetail();
  }

  getDetail():void {
    const id = Number(this.route.snapshot.params['id']);
    this.itemService.getDetail(id)
      .subscribe((items) => {
        this.items = items;
        this.getBillItems(this.items[0].receiptId);
      });
  }

  getBillItems(receipId:string):void{
    this.billItemService.getBillItems(receipId).subscribe((items) => {
      if(items.length){
        this.itemsOfBill = items[0].items;
      }      
    });
  }

}
