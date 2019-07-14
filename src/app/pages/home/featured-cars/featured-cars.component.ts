import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-featured-cars',
  templateUrl: './featured-cars.component.html',
  styleUrls: ['./featured-cars.component.css']
})
export class FeaturedCarsComponent implements OnInit {

  cars:Car[]=[];
  constructor(private carService: CarsService) { }

  ngOnInit() {
    this.carService.listCars.subscribe(
      data => this.cars = data
    );
  }
  averagePrice(pricing:{duree:string;prices:number[]}[]){
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
  selectCar(car:Car){
    this.carService.selectCar(car);
  }
}
