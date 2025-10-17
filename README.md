# Countdown App

A responsive countdown app built with **Angular** and **TypeScript**.  
Users can set an event name and date, and the app shows a live countdown that automatically resizes to fit the screen.  
A random quote is also fetched from [https://dummyjson.com/quotes/random](https://dummyjson.com/quotes/random) on each page load.

---

## Setup

```bash
# Clone the repository
git clone https://github.com/ViktorAndersson/countdown-app/
cd countdown-app

# Install dependencies
npm install

# Start the development server (http://localhost:4200)
npm start

# Build for production
npm run build

# Format all code with Prettier before committing
npx prettier --write .
```

Suggestions for future development:

* Look over accessibility for the application (ARIA labels for example)
* Depending on the apps intended usage, change handling of the timezone (for example if the timer should be shareable)
* The Text-fit feels a bit unsmoothe at times, and maybe changing the size of the text every second isn't the best idea considering the jumps that happens while going from 0 to 59 on the seconds counter. Also adding smoother animations could improve the users experience
* I did make the date field a calendar picker, since writing in the dates can create a lot of errors and confusion. It would be a good idea to alter the date picker to prevent from picking past dates.
* Use a "fallback" quote if the quote API fails.
