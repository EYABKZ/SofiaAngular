import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent // Assurez-vous que ce composant est uniquement ici
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule // Assurez-vous que ReactiveFormsModule est bien importé
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }