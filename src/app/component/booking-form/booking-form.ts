import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PassengerService } from '../../service/PassengerService';
import { Passenger } from '../../interface/BookingInterface';
import { CustomValidators } from '../../common-validators/custom-validators';
import { ErrorService } from '../common-error/error-service';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css',
})
export class BookingForm implements OnInit {
  bookingForm!: FormGroup;
  seatId!: number;
  error = '';

  constructor(private readonly fb: FormBuilder, private readonly route: ActivatedRoute, private readonly router: Router, private readonly passengerService: PassengerService,
    public  errorService: ErrorService
  ) { }

  ngOnInit(): void {
  this.seatId = Number(this.route.snapshot.paramMap.get('id'));
  console.log('Seat ID:', this.seatId);
  const seat = this.passengerService.getSeatById(this.seatId);
  console.log('Seat:', seat);
  if (!seat || seat.status === 'booked') {
    this.router.navigate(['/reserve']);
    return;
  }
  this.buildForm();
}
  buildForm(): void {
    this.bookingForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.noSpecialCharacters()
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          CustomValidators.noSpecialCharacters()
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ]
    });
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.error = 'Please fill in all required fields with valid information.';
      return;
    }
    const { firstName, lastName, email } = this.bookingForm.value;
    const passenger: Passenger = {
      firstName,
      lastName,
      email,
      seatNumber: this.seatId,
      bookingDate: ''
    }
    const formValue = this.bookingForm.value;
    this.passengerService.bookSeat(this.seatId, passenger);
    this.router.navigate(['/dashboard']);
    console.log(formValue);
  }

  cancel(): void {
    this.router.navigate(['/reserve']);
  }


}
