import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  contact_forms: any[] = [];  // Array to hold the list of contacts

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchContacts();  // Fetch contacts when the component initializes
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.http.post('http://localhost:3000/contact', this.contactForm.value)
        .pipe(
          catchError(error => {
            console.error('Error occurred:', error);
            alert('There was an error submitting the form. Please try again later.');
            return throwError(error);
          })
        )
        .subscribe(response => {
          console.log('Form submitted successfully:', response);
          alert('Form submitted successfully!');
          this.contactForm.reset();
          this.fetchContacts();  // Refresh the list of contacts
        });
    }
  }

  fetchContacts() {
    this.http.get<any[]>('http://localhost:3000/contacts')  // Update with the correct endpoint
      .pipe(
        catchError(error => {
          console.error('Error occurred while fetching contacts:', error);
          return throwError(error);
        })
      )
      .subscribe(contacts => {
        this.contact_forms = contacts;  // Populate the contact_forms array
      });
  }
}
