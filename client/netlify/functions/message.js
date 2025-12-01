const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'thutomclean@gmail.com',
    pass: process.env.EMAIL_PASS || 'tpgybcsqyytxqqia',
  },
});

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { letter, email, date } = JSON.parse(event.body);

    if (!letter || !email || !date) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Missing fields' }),
      };
    }

    // Send confirmation email immediately
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'thutomclean@gmail.com',
      to: email,
      subject: 'Your Message In a Bottle has been sent! 🍾',
      html: `
        <h2>Your letter has been scheduled!</h2>
        <p>We'll deliver your message to <strong>${email}</strong> on <strong>${date}</strong>.</p>
        <hr>
        <h3>Preview of your letter:</h3>
        <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 8px;">${letter}</p>
        <hr>
        <p><em>- Message In a Bottle 🌊</em></p>
      `,
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to send message' }),
    };
  }
};
