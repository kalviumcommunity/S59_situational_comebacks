const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./modals/post');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  debug: true, 
});


router.post('/register', async (req, res) => {
  const { userName, emailId, password, userId, } = req.body;

  try {
    const existing = await User.findOne({ $or: [{ emailId }, { userId }] });

    const otp = generateOTP();

    if (existing) {
      return res.status(400).json({ error: "Account already exists" });
    }
    const newUser = new User({ userName, emailId, userId });
    newUser.setPassword(password);
    newUser.otp = otp; 
    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: emailId,
      subject: 'Verify your email address',
      html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p>
      <p>Thanks for being Part of our family</p>`
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending verification email:', error);
      } else {
        console.log('Verification email sent:', info.response);
      }
    });

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ "error": error || "Error here" });
  }
});


router.post('/verify-otp', async (req, res) => {
  const { emailId, otp } = req.body;

  try {
    const user = await User.findOne({ emailId });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }


    user.emailVerified = true;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' });

    const currentTime = new Date().toLocaleString();

   
    const mailOptions = {
      from: process.env.EMAIL,
      to: emailId,
      subject: 'Successful Login Notification',
      html: `<p>Hello ${user.userName},</p>
             <p>This is to notify you that you have successfully logged in at ${currentTime}.</p>
             <p>If you didn't login then please <b>Respond to this mail</b></p>`
    };

   
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending login notification email:', error);
      } else {
        console.log('Login notification email sent:', info.response);
      }
    });

    res.status(200).json({ token, userName: user.userName, Id: user._id, userId: user.userId });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


function generateOTP() {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

module.exports = router;
