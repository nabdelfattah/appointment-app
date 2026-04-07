import { Component, OnInit } from '@angular/core';
import { Appointment } from './appointment';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: string = '';

  appointments: Appointment[] = [];

  ngOnInit(): void {
    let savedData = localStorage.getItem('appointments');
    this.appointments = savedData ? JSON.parse(savedData) : [];
  }

  addAppointment() {
    // validate user input
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      // add an appointment to the arry
      let newAppointment = {
        id: crypto.randomUUID(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
      };
      this.appointments.push(newAppointment);
      // Insert data in local storage
      localStorage.setItem('appointments', JSON.stringify(this.appointments));
      // reset the input fields
      this.newAppointmentTitle = '';
      this.newAppointmentDate = '';
    }
  }

  deleteAppointment(id: string) {
    // remove the deleted item from appointments array
    this.appointments = this.appointments.filter((obj) => obj.id !== id);
    // update local storage
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
