import { Component, OnInit } from '@angular/core';
import { Seat } from '../../interface/BookingInterface';
import { Observable } from 'rxjs';
import { PassengerService } from '../../service/PassengerService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seat-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-component.html',
  styleUrl: './seat-component.css',
})
export class SeatComponent implements OnInit {
  seats$!: Observable<Seat[]>;
  selectedSeatId: number | null = null;
  constructor(private readonly passengerService: PassengerService,private readonly router: Router) { }

  ngOnInit(): void {
     this.seats$ = this.passengerService.getSeats();
  }
   getLowerSeats(seats: Seat[]): Seat[] {
    return seats.filter(s => s.deck === 'lower');
  }
   getUpperSeats(seats: Seat[]): Seat[] {
    return seats.filter(s => s.deck === 'upper');
  }
    selectSeat(seat: Seat): void {
      debugger;
    if (seat.status === 'booked') return;
    this.selectedSeatId = seat.id;
    this.router.navigate(['/reserve', seat.id]);
  }
  trackBySeatId(index: number, seat: Seat): number {
    return seat.id;
  }


}
