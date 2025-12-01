# Message In a Bottle 🍾

A web application that lets you write letters to your future self and receive them via email on a specified date.

## Overview

Message In a Bottle is a simple yet meaningful tool for self-reflection and time capsule messaging. Write a letter today, pick a delivery date in the future, and receive your message in your inbox when that day arrives.

## Features

- ✍️ **Write Letters** — Compose personal messages to your future self
- 📅 **Flexible Scheduling** — Choose from preset durations (3 months, 6 months, 1 year, 5 years, 10 years) or pick a custom date
- 📧 **Email Delivery** — Receive your letter via email on the scheduled date
- 📱 **Mobile Friendly** — Responsive design works on all devices
- 🎨 **Beautiful UI** — Clean, beach-themed interface with a calming aesthetic

## Tech Stack

- **Frontend**: React.js
- **Backend**: Express.js (Node.js)
- **Email Service**: Nodemailer with Gmail SMTP
- **Scheduling**: node-cron for scheduled email delivery

## Project Structure

```
message-bottle/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── bottle.png      # Favicon
│   │   └── beach.jpg       # Background image
│   └── src/
│       ├── App.js          # Main React component
│       ├── App.css         # Styles
│       └── assets/
│           └── bottle.png  # Bottle artwork
├── server/                 # Express backend
│   └── index.js            # API and email scheduling
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gmail account (for sending emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd message-bottle
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Configure email credentials**
   
   Edit `server/index.js` and update the Gmail credentials:
   ```javascript
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'your-email@gmail.com',
       pass: 'your-app-password',  // Use Gmail App Password
     },
   });
   ```
   
   > **Note**: You need to generate an [App Password](https://support.google.com/accounts/answer/185833) from your Google Account settings.

### Running the Application

1. **Start the backend server** (runs on port 5001)
   ```bash
   cd server
   node index.js
   ```

2. **Start the frontend** (runs on port 3000)
   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## How It Works

1. **Write your letter** — Start with "Dear Future Me," and express your thoughts
2. **Enter your email** — Provide the email address where you want to receive the letter
3. **Pick a delivery date** — Choose a preset duration or select a custom date
4. **Send it off** — Click the send button and your message is scheduled

The backend stores your message and checks every minute if any letters are due for delivery. When the date arrives, your letter is sent to your email.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/message` | Schedule a new message |

### Request Body
```json
{
  "letter": "Dear Future Me, ...",
  "email": "example@email.com",
  "date": "2026-01-15"
}
```

## License

This project is open source and available under the MIT License.

---

*Cast your message into the sea of time — your future self is waiting.* 🌊
