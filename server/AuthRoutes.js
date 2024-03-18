const express = require('express');
const router = express.Router();
const jwt =require('jsonwebtoken')
require('dotenv').config()
const User = require('./modals/post')



router.get('/user', async(req, res) => {
    const data = await User.find()
    res.send(data)
}
);

router.post('/register', async (req, res) => {
  const { userName, emailId, password, userId } = req.body;

  try {

    const existing = await User.findOne({ $or: [{ emailId }, { userId }] });

    console.log(existing)
    if(existing){
      return res.status(400).json({error : "Account already exists"})
    }

    const newUser = new User({ userName, emailId , userId });

    newUser.setPassword(password)

      const savedUser = await newUser.save(); 

      if (!savedUser) { 
          return res.status(400).json({ error: 'Email already exists' });
      }
      res.status(201).json(savedUser);
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({"error" : error || "Error here"});
  }
});

router.post('/login', async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '2h' });

    res.status(200).json({ token, userName: user.userName, Id: user._id, userId: user.userId });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router