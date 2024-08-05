// server.js
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express(); //tao 1 may chu express

app.use(bodyParser.json()); //phân tích nội dung của các yêu cầu HTTP dưới dạng JSON

app.post('/submit', async (req, res) => { 
  const { token } = req.body;

  const secretKey = process.env.REACT_APP_SECRET_KEY; 

  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, { 
      params: {
        secret: secretKey,
        response: token,
      },
    });

    if (response.data.success) {
      res.json({ success: true, message: 'reCAPTCHA verified successfully' });
    } else {
      res.json({ success: false, message: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
