import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seat } from '../../interface/BookingInterface';
import { PassengerService } from '../../service/PassengerService';
import { CustomValidators } from '../../common-validators/custom-validators';
import { ErrorService } from '../common-error/error-service';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent implements OnInit {
  bookedSeats: Seat[] = [];
  editingSeatId: number | null = null;
  editForm!: FormGroup;
  tableHeaders: string[] = [
  'Seat',
  'First Name',
  'Last Name',
  'Email',
  'Date',
  'Actions'
];

  constructor(
    private passengerService: PassengerService,
    private readonly fb: FormBuilder,
    public errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loadBookedSeats();
  }

  buildForm(): void {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), CustomValidators.noSpecialCharacters()]],
      lastName: ['', [Validators.required, Validators.minLength(1), CustomValidators.noSpecialCharacters()]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  loadBookedSeats(): void {
    this.bookedSeats = this.passengerService.getBookedSeats();
  }

  startEdit(seat: Seat): void {
    if (!seat.passenger) return;
    
    this.buildForm(); 
    this.editingSeatId = seat.id;
    
    this.editForm.patchValue({
      firstName: seat.passenger.firstName,
      lastName: seat.passenger.lastName,
      email: seat.passenger.email
    });
  }

  saveEdit(seatId: number): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.passengerService.updatePassenger(seatId, this.editForm.value);
    this.editingSeatId = null;
    this.loadBookedSeats();
  }

  cancelEdit(): void {
    this.editingSeatId = null;
  }

  deleteBooking(seatId: number): void {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    this.passengerService.deletePassenger(seatId);
    this.loadBookedSeats();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}