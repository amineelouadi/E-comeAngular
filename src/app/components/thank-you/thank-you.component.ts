import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
})
export class ThankYouComponent implements OnInit, OnDestroy {
  countdown: number = 6; // Countdown starting from 6 seconds
  countdownSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  startCountdown() {
    this.countdownSubscription = interval(1000)
      .pipe(
        map(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            this.router.navigate(['/products']);
            return 0; // Stop the countdown
          }
          return this.countdown;
        })
      )
      .subscribe();
  }

  goToProducts() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
    this.router.navigate(['/products']);
  }
}