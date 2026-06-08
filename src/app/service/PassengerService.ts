import{Injectable}from'@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Seat,Passenger } from '../interface/BookingInterface';
@Injectable({providedIn:'root'})
export class PassengerService {
   private seatsSubject = new BehaviorSubject<Seat[]>([]);
   public seats$ = this.seatsSubject.asObservable();

    constructor() {
        this.initializeSeats();
    }
    private initializeSeats() {
         if (typeof localStorage === 'undefined') {
    this.seatsSubject.next(this.generateInitialSeats());
    return;
  }
        const stored = localStorage.getItem('bus_booking_seats');
        if(stored) {
            try{
 const parsed = JSON.parse(stored);
            this.seatsSubject.next(parsed);

            return;

            }
            catch(e){
                console.warn('Failed to load stored seats, resetting');
            }
           
        }
         this.seatsSubject.next(this.generateInitialSeats());
    }

     private generateInitialSeats(): Seat[] {
    const seats: Seat[] = [];
    for (let i = 1; i <= 20; i++) {
      seats.push({ id: i, deck: 'lower', status: 'available' });
    }
    for (let i = 21; i <= 40; i++) {
      seats.push({ id: i, deck: 'upper', status: 'available' });
    }
    return seats;
  }

   private saveToStorage(): void {
     if (typeof localStorage === 'undefined') {
    return;
  }
    localStorage.setItem('bus_booking_seats', JSON.stringify(this.seatsSubject.value));

  }

  getSeats(): Observable<Seat[]> {
    return this.seats$;
  }

   getSeatById(id: number): Seat | undefined {
    return this.seatsSubject.value.find(s => s.id === id);
  }
  bookSeat(seatId: number, passenger: Passenger): void {
    const current = this.seatsSubject.value;
    const idx = current.findIndex(s => s.id === seatId);
    if (idx === -1) return;

    current[idx] = {
      ...current[idx],
      status: 'booked',
      passenger: {
        ...passenger,
        seatNumber: seatId,
        bookingDate: new Date().toISOString()
      }
    };

    this.seatsSubject.next([...current]);
    this.saveToStorage();
  }
  updatePassenger(seatId: number, updates: Partial<Passenger>): void {
    const current = this.seatsSubject.value;
    const idx = current.findIndex(s => s.id === seatId);
    if (idx === -1 || !current[idx].passenger) return;

    current[idx] = {
      ...current[idx],
      passenger: {
        ...current[idx].passenger!,
        ...updates,
        seatNumber: seatId
      }
    };

    this.seatsSubject.next([...current]);
    this.saveToStorage();
  }
  deletePassenger(seatId: number): void {
    const current = this.seatsSubject.value;
    const idx = current.findIndex(s => s.id === seatId);
    if (idx === -1) return;

    current[idx] = {
      ...current[idx],
      status: 'available',
      passenger: undefined
    };

    this.seatsSubject.next([...current]);
    this.saveToStorage();
  }
 getBookedSeats(): Seat[] {
    return this.seatsSubject.value.filter(s => s.status === 'booked');
  }
}