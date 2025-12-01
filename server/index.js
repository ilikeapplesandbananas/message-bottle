import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cron from 'node-cron';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const messages = [];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thutomclean@gmail.com',
    pass: 'tpgybcsqyytxqqia',
  },
});

app.post('/api/message', (req, res) => {
  const { letter, email, date } = req.body;
  if (!letter || !email || !date) return res.status(400).send('Missing fields');
  messages.push({ letter, email, date, created: new Date().toISOString() });
  res.send({ success: true });
});

cron.schedule('* * * * *', () => {
  const now = new Date().toISOString().split('T')[0];
  messages.forEach((msg, idx) => {
    if (msg.date === now && !msg.sent) {
      transporter.sendMail({
        from: 'thutomclean@gmail.com',
        to: msg.email,
        subject: 'A message from your past self',
        text: `${msg.letter}\n\nWritten on: ${msg.created}`,
      }, (err, info) => {
        if (!err) messages[idx].sent = true;
      });
    }
  });
});

app.listen(5001, () => console.log('Server running on port 5001'));
