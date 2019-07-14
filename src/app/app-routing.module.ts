import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { CarsListingComponent } from './pages/carsListing/cars-listing.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'carDetails',component:CarDetailsComponent},
  {path:'carListing',component:CarsListingComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
