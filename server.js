const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Email sending route
app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({ message: 'Please fill all fields.' });
  }

  // Nodemailer setup
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nannhsuyadihtet@gmail.com',        // your Gmail
      pass: 'NannHsu'            // app password, not your Gmail password
    }
  });

  let mailOptions = {
    from: email,
    to: 'nannhsuyadihtet@gmail.com',      // where you want to receive emails
    subject: `Portfolio Contact Form: ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.json({ message: 'Error sending message.' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
