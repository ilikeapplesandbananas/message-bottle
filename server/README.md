# Message In A Bottle Backend

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Replace Ethereal credentials in `index.js` with your own or use a real SMTP provider (e.g., SendGrid).
3. Start the server:
   ```
   npm start
   ```

## How it works
- Stores messages in memory (for demo; use a database for production).
- Schedules email delivery using cron.
- Receives POST requests at `/api/message` with `{ letter, email, date }`.
