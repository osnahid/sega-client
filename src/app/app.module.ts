import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { FilterComponent } from './pages/home/filter/filter.component';
import { CarsListingComponent } from './pages/carsListing/cars-listing.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';

import { NewsComponent } from './pages/home/news/news.component';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { CarsService } from './services/cars.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FeaturedCarsComponent } from './pages/home/featured-cars/featured-cars.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FilterComponent,
    CarsListingComponent,
    FeaturedCarsComponent,
    CarDetailsComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    CarsService,
    AngularFirestore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
