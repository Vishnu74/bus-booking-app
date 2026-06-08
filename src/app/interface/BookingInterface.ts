
export interface Seat {
    id: number;
    deck: 'lower' | 'upper';
    status: 'available' | 'booked';
    passenger?: Passenger;
}

export interface Passenger {
    firstName: string;
    lastName: string;
    email: string;
    seatNumber: number;
    bookingDate: string;
}