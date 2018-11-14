const nodemailer = require('nodemailer');
const express = require('express');

const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/send-email', (req, res, next) => {
  const { email, subject, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'e-mail', // email
      pass: 'Password', // password
    },
  });
  transporter
    .sendMail({
      from: '"My Awesome Project 👻" <myawesome@project.com>',
      to: email,
      subject,
      text: message,
      html: `<b>${message}</b>`,
    })
    .then(info => res.render('message', {
      email,
      subject,
      message,
      info,
    }))
    .catch(error => console.log(error));
  // res.render('message', { email, subject, message })
});

module.exports = router;
