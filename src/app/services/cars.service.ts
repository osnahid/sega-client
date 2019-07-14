import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {  Car } from '../models/car';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
    private car =new BehaviorSubject<Car>(null);
    selectedCar = this.car.asObservable();
    private cars = new BehaviorSubject<Car[]>(null);
    listCars = this.cars.asObservable();
    private filtercars = new BehaviorSubject<Car[]>(null);
    listFilterCars = this.filtercars.asObservable();
  constructor(private fire: AngularFirestore,private storage: AngularFireStorage,private route: Router) {
      this.getCars();
  }
  getCars(){
     return this.fire.collection<Car>('cars',ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        return query.where('status', '==', true);
      }).valueChanges().subscribe(data => this.cars.next(data));
  }
  getLocation(){
    return this.fire.collection<any>('locations').valueChanges();
  }
    getLocationName(ref){
       return this.fire.doc<any>(ref).valueChanges();
  }
filterCars(filters:{type?:string;brand?:string;model?:string;locations?:any;year?:number}){
    let cars:Car[] = [];
    let filter: Car[] = [];
    this.listCars.subscribe(data => cars = data);
    for(let [key,value] of Object.entries(filters)){
        cars.forEach(
            (val) =>{
                if(key === 'locations'){
                    val[key].forEach(
                        valLoc =>{
                            if(valLoc === value) filter.push(val);
                        }
                    );
                }else if(val[key] === value) {
                    filter.push(val);
                }
            }
        );
        cars = [];
        cars = filter;
        filter = [];
    }
    this.filtercars.next(cars);
    this.route.navigate(['/carListing']);
}
    selectCar(car: Car){
        this.car.next(car);
        this.route.navigate(['/carDetails']);
    }
}
