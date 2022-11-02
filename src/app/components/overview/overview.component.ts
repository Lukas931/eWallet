import { Component, OnInit,ViewChild } from '@angular/core';

import { ChartConfiguration, ChartData, ChartOptions, ChartType,ChartEvent } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';


import {ItemService} from '../../services/item.service';

import {Item} from '../../item';

export interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @ViewChild('lineChart') lineChart: BaseChartDirective | undefined;
  @ViewChild('barChart') barChart: BaseChartDirective | undefined;

  items: Item[] = [];
  incomeGraph: LooseObject = {};
  outcomeGraph: LooseObject = {};

  outcomeShop: LooseObject = {};

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels:[],
    datasets:[
      {
        data: [],
        label: '',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      },
      {
        data: [],
        label: '',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'yellow'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;


  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
      labels: [],
      datasets: [
        { data: [], label:"Obchody" }
      ]
    };
  constructor(
    private itemService: ItemService,
  ) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe(
      (items) => this.getDataForGraph(items)
    );
  }
  ngAfterViewInit(): void{
    
  }

  getDataForGraph(items:Item[]):void {
   
    this.lineGraph(items);
    this.barGraph(items);
  }

  getDateFromUnix(unix:number):string {
    var test = unix;
    var date = new Date(test);
    var day = date.getDate();
    var month = date.getMonth() + 1;
   
    var label = day +'.'+month +'.';
    return label;
  }

  lineGraph(items:Item[]):void{
    this.incomeGraph = {};
    this.outcomeGraph = {};
    var labelArray = Array();
    var dataArray = {};
    this.lineChartData.datasets.forEach((dataset) => {
      dataset.data = [];
    });

    var tmpItems = items;
    
    tmpItems.sort((a,b) => a.date - b.date);

    for(let item of tmpItems){
      let label = this.getDateFromUnix(item.date);
      if(!labelArray.includes(label)){
        labelArray.push(label);
      }
      let tmpOutcome = 0;
      let tmpIncome = 0;
      if(item.type === 2){       
        if(this.outcomeGraph[label] !== undefined) {
          tmpOutcome = this.outcomeGraph[label] + item.value;
        } else {
          tmpOutcome = item.value;
        }
      }
      if(item.type === 1){
        if(this.incomeGraph[label] !== undefined) {
          tmpIncome = this.incomeGraph[label] + item.value
        } else {
          tmpIncome = item.value;
        }
      }

      this.incomeGraph[label] = tmpIncome;
      this.outcomeGraph[label] = tmpOutcome;
    }

    for(let val in this.outcomeGraph){
      this.lineChartData.datasets[0].data.push(this.outcomeGraph[val].toFixed(2));
    }

    for(let val in this.incomeGraph){
      this.lineChartData.datasets[1].data.push(this.incomeGraph[val].toFixed(2));
    }
    

    this.lineChartData.datasets[0].label = 'Výdaje';
    this.lineChartData.datasets[1].label = 'Prijem';

    this.lineChartData.labels = labelArray;
    this.lineChart?.update();
  }

  barGraph(items:Item[]):void{
    items.forEach((item) => {
      if(item.type === 2){  
        if(this.outcomeShop[item.text] !== undefined) {
          this.outcomeShop[item.text] = this.outcomeShop[item.text] + item.value
        } else {
          this.outcomeShop[item.text] = item.value;
        }
        if(!this.barChartData?.labels?.includes(item.text)){
          this.barChartData?.labels?.push(item.text);
        }
      }
    });

    for(let val in this.outcomeShop){
      this.barChartData.datasets[0].data.push(this.outcomeShop[val].toFixed(2));
    }
    this.barChart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

}
