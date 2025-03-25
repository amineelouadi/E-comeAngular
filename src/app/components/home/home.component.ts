import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import emailjs from 'emailjs-com';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  userEmail: string = '';

  sendEmail() {
    const serviceID = 'service_karkq4d';
    const templateID = 'template_blypjoo';
    const publicKey = 'Ox2J-tr7JUZ0tWpxj';

    const templateParams = {
      email: this.userEmail,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response: { status: number; text: string }) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((error: Error) => {
        console.error('Failed to send email. Error:', error);
      });
  }
}