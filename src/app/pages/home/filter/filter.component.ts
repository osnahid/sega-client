import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filter:{type?:string;brand?:string;model?:string;locations?:any;year?:number}={};
  brand:string='';
  type:string='';
  model:string='';
  year:number=2019;
  location:any;
  brands:{name:string,models:{model:string,locations?:{name:string,city:string,ref:any}[]}[]}[]=[];
  models:string[]=[];
  locations:any[]=[];
  years: number[]=[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019];
  onSelectType(){
    this.filter.type = this.type;
    
    this.brands = [];
    this.models=[];
    this.locations=[];
    this.carService.listCars.subscribe(data =>{
      data.forEach(
        val => {
          if(this.type === val.type){let brandExist = true;
          if(this.brands.length > 0){ this.brands.forEach(fn =>{
             if(val.brand === fn.name){
               let modelExist = false;
               fn.models.forEach(valModel =>{
                 if(valModel.model === val.model){
                   modelExist = true;
                 }
               });
               if(!modelExist) {
                let locations:{name:string,city:string,ref:string}[]=[];
                val.locations.forEach(refVal =>this.carService.getLocationName(refVal).subscribe(location => this.carService.getLocationName(location.city).subscribe(city => locations.push({name:location.name,city:city.name,ref:refVal}))));
                fn.models.push({model:val.model,locations:locations});
              }
             }else{
               brandExist = false;
             }
           });}else{
             brandExist = false;
           }
           if(!brandExist){
            let models:any[]=[];
            let locations:{name:string,city:string,ref:string}[]=[];
            val.locations.forEach(refVal =>this.carService.getLocationName(refVal).subscribe(location =>  this.carService.getLocationName(location.city).subscribe(city => locations.push({name:location.name,city:city.name,ref:refVal}))));
            models.push({model:val.model,locations:locations});
             this.brands.push({name:val.brand,models:models});
           }}
        }
      )
     });
  }
  onSearch(){
      this.carService.filterCars(this.filter);
  }
  onChangeYear(){
    this.filter.year = this.year;
  }
  onChangeLocation(){
    this.filter.locations = this.location;
  }
  onChangeModels(){
    this.filter.model = this.model;
    this.brands.forEach(element => {
      if(element.name === this.brand){
        element.models.forEach(
          data =>{
            if(this.model === data.model) this.locations = data.locations;
          }
        );
    }
  });
  }
  onChangeBrands(){
    this.filter.brand = this.brand;
     this.brands.forEach(element => {
      if(element.name === this.brand){
        element.models.forEach(
          data =>{
            this.models.push(data.model);
          }
        );
    }
  });
}
  constructor(private carService: CarsService) { }

  ngOnInit() {
    
  }

}
