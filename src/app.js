require('dotenv').config();
const sendEmail = require('./utils/sendEmail');
const template = require('./templates/email');
const axios = require('axios');
const express = require('express');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public'));


app.get('/', (req, res) => {
  res.render('index');
});

app.post('/send-email', async (req, res) => {
  const captchaVerification = await axios.post(`${process.env.GOOGLE_API_ENDPOINT}?secret=${process.env.SECRET_KEY}&response=${req.body['g-recaptcha-response']}`);
  if (captchaVerification.data.success !== true) return res.status(400).json({ error: true, message: "Captcha verification failed" });
  const emailData = {
    email: req.body.email,
    subject: req.body.subject,
    template: template(req.body.firstName, req.body.lastName, req.body.message),
  }
  sendEmail(emailData);
  res.status(200).json({ error: false, message: "E-mail was sent successfully" });
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Express app is running on port " + process.env.PORT || 3000);
})