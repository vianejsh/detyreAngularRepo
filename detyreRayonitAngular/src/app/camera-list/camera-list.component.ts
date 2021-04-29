import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CameraService } from '../camera.service';
import {Observable, of} from "rxjs";
import {Camera} from "../Camera";
import {Router} from "@angular/router";
import * as Chart from 'chart.js';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-camera-list',
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.css']
})

export class CameraListComponent implements OnInit {


  @ViewChild('lineChart', {static: true}) private chartRef: ElementRef <HTMLCanvasElement>;
  
  cameras: Array<any>;
  public dataSource:any;
  

  rawChartData : any[];
  counts : any[] = [];
  resolutions : any[] = [];
  chart: Chart;
  page:number = 1;
  pageSize :number;
  totalElements : number;

  totalRec:number;

  constructor(private cameraService: CameraService, private router: Router){}
  

    ngOnInit(): void {
      this.reloadData();
  }

  reloadData(){
    this.cameraService.getCamerasList().subscribe(data=>{
      console.log(data);
      this.cameras = data.content;
      console.log(this.cameras);
      this.totalElements = data['totalElements'];
     
      
    });
    
    this.buildChart();
  }
  
  deleteCamera(id : number){
    this.cameraService.deleteCamera(id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
        window.location.reload();
      },
      error => console.log(error));
  }

  getPage(event: any) {
    if (event != null) {
      this.pageSize = event.pageSize;
      this.page = event.pageIndex;
    }
    this.reloadData();
  }

  buildChart(){
    this.cameraService.chartData().subscribe(
      res=>{
        this.rawChartData = res//.id;
        this.counts =[];
        this.resolutions = [];
        this.totalRec = res.length;
        this.rawChartData.forEach((data)=>{
          this.counts.push(data.count);
          this.resolutions.push(data.id);
        })
        
        
      console.log(this.resolutions);
 
      this.chart = new Chart(this.chartRef.nativeElement, {
        type:'bar',
        data:{
          labels: this.resolutions,
          datasets:[ {
            data: this.counts
          }]
        },
        options:{
          legend:{
            display:false
          }
        }
      })
      })
  }

  cameraDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateCamera(id: number){
    this.router.navigate(['update', id]);
  }

  getChartDataFromDB(){
    //this.chartData = this.cameraService.chartData();
    
  }
  populateChartDataSet(){
    
  }
//pagination methods
/*
  ngOnChanges(changes: cameras) {
    // reset page if items array has changed
    if (changes.cameras.currentValue !== changes.cameras.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  private setPage(page: number) {
    // get new pager object for specified page
    this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

    // get new page of items from items array
    var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);

    // call change page function in parent component
    this.changePage.emit(pageOfItems);
  }*/
//e.o pagination methods

}

