import { Routes } from '@angular/router';
import { SeatComponent } from './component/seat-component/seat-component';
import { BookingForm } from './component/booking-form/booking-form';
import { DashboardComponent } from './component/dashboard-component/dashboard-component';


export const routes: Routes = [
 { path: 'reserve', component: SeatComponent },
 {path:'reserve/:id', component: BookingForm},
 {path:'dashboard', component: DashboardComponent},
 { path: '', redirectTo: '/reserve', pathMatch: 'full' },
  { path: '**', redirectTo: '/reserve' }    
 
];
