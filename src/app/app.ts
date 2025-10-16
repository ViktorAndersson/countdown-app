import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextFitDirective } from './text-fit.directive';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [FormsModule, TextFitDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('countdown');
  eventName = '';
  eventDate = '';
  countdown = '';
  quote = '';
  isLoadingQuote = false;

  private timer?: ReturnType<typeof setInterval>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadQuote();
    const savedName = localStorage.getItem('eventName');
    const savedDate = localStorage.getItem('eventDate');

    if (savedName) this.eventName = savedName;
    if (savedDate) {
      this.eventDate = savedDate;
      this.startCountdown();
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  onNameChange() {
    localStorage.setItem('eventName', this.eventName);
  }

  onDateChange() {
    localStorage.setItem('eventDate', this.eventDate);
    this.startCountdown();
  }

  startCountdown() {
    if (!this.eventDate) return;

    // rensa eventuell gammal timer
    clearInterval(this.timer);

    this.updateCountdown();

    this.timer = setInterval(() => this.updateCountdown(), 1000);
  }

  loadQuote() {
    this.isLoadingQuote = true;

    this.http.get<{ quote: string }>('https://dummyjson.com/quotes/random').subscribe({
      next: (data) => {
        this.quote = data.quote;
        this.isLoadingQuote = false;
      },
      error: () => {
        this.quote = 'Could not load quote.';
        this.isLoadingQuote = false;
      },
    });
  }

  private updateCountdown() {
    const todaysDate = new Date().getTime();
    const [year, month, day] = this.eventDate.split('-').map(Number);
    const targetDate = new Date(year, month - 1, day).getTime();
    const diff = targetDate - todaysDate;

    if (diff <= 0) {
      this.countdown = '0 days, 0 h, 0 m, 0 s';
      clearInterval(this.timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.countdown = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
  }
}
