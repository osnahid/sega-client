import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car: Car = null;
  constructor(private carService: CarsService) { }

  ngOnInit() {
    this.carService.selectedCar.subscribe(
      data => this.car = data
    );
  }
onRentClick(){

}
}
