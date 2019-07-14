import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-cars-listing',
  templateUrl: './cars-listing.component.html',
  styleUrls: ['./cars-listing.component.css']
})
export class CarsListingComponent implements OnInit {
  filter:{type?:string;brand?:string;model?:string;fuel?:string;transmission?:string;location?:any;year?:number}={};
  cars:Car[]=[];
  years: number[]=[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019];
  brands:{name:string,models:string[]}[]=[];
  models:string[];
  constructor(private carService:CarsService,private route: Router) { }

  ngOnInit() {
    this.carService.listFilterCars.subscribe(
      data => {
        if(data){
          this.cars = data;
        }else{
          this.carService.listCars.subscribe(cars => this.cars = cars);
        }
      }
    );
  }
  
  getPrice(pricing:{duree:string;prices:number[]}[]){
    let price=0;
    pricing.forEach(
      val=>{
        if(val.duree === "1-3" && val.prices.length > 1){
          let mounth = new Date().getMonth();
          price = val.prices[mounth];
        }else if(val.duree === "1-3" && val.prices.length == 1){
          price = val.prices[0];
        }
      }
    );
    return price;
  }
  onSelectBrand(){
    this.brands.forEach(
      val=>{
        if(this.filter.brand === val.name){
          this.models = val.models;
        }
      }
    );
  }
  onSearch(){
    this.cars = [];
    this.carService.filterCars(this.filter);
    this.carService.listFilterCars.subscribe(data => this.cars = data);
    window.scroll(0,300);
  }
  selectCar(car:Car){
    this.carService.selectCar(car);
  }
  onSelectType(){
    this.brands = [];
    this.models=[];
    this.carService.listCars.subscribe(data =>{
      data.forEach(
        val => {
          if(this.filter.type === val.type){let brandExist = true;
          if(this.brands.length > 0){ this.brands.forEach(fn =>{
             if(val.brand === fn.name){
               let modelExist = false;
               fn.models.forEach(valModel =>{
                 if(valModel === val.model){
                   modelExist = true;
                 }
               });
               if(!modelExist) {
                fn.models.push(val.model);
              }
             }else{
               brandExist = false;
             }
           });}else{
             brandExist = false;
           }
           if(!brandExist){
             this.brands.push({name:val.brand,models:[val.model]});
           }}
        }
      )
     });
  }
}
