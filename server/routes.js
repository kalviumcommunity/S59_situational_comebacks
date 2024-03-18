const express = require('express');
const router = express.Router();
const {connectDB} = require('./db')
const family = require('./modals/family')
const pickup = require('./modals/pickup')
const standup = require('./modals/standup')
const postes=require('./modals/post')
const {schema} = require('./joiSchema')
const jwt =require('jsonwebtoken')
require('dotenv').config()

connectDB()

const authToken = (req, res, next) => {
    const authHead = req.headers['authorization'];
    const token = authHead && authHead.split(' ')[1];  
    if(token == null){
      return res.status(401).json({ error: "Unauthorized Access", message: "You are not authorized to access this resource." });
    }
    
    jwt.verify(token, process.env.SECRET_KEY, (err, userId) => {
      if(err){
        return res.status(403).json({ error: "Forbidden", message: "Access forbidden. Please login again." });
      }
      req.userId = userId;

     next();
  });
  }


router.get('/pickups',async(req,res)=>{
    const data = await pickup.find()
    res.send(data)
})


router.get('/standups',async(req,res)=>{
    const data = await standup.find()
    res.send(data)
})

router.get('/familys',async(req,res)=>{
    const data = await family.find()
    res.send(data)
})


router.get('/posts', async(req, res) => {
    const data = await postes.find()
    res.send(data)
}); 


router.post('/:collection',authToken, async (req, res) => {
    const collectionName = req.params.collection;
    try {
        const {error} =schema.validate(req.body)
        if(error){
          return res.status(400).json(error)
        }
        
        let collectionModel;
        switch (collectionName) {
            case 'pickups':
                collectionModel = pickup;
                break;
            case 'standups':
                collectionModel = standup;
                break;
            case 'familys':
                collectionModel = family;
                break;
            default:
                return res.status(400).json({ error: 'Invalid collection name' });
        }
        
        const newPost = new collectionModel(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ "error":"Error"});
    }
});

router.put('/:collection/:id',authToken, async (req, res) => {
    const collectionName = req.params.collection;
    try {
        
        let collectionModel;
        switch (collectionName) {
            case 'pickups':
                collectionModel = pickup;
                break;
            case 'standups':
                collectionModel = standup;
                break;
            case 'familys':
                collectionModel = family;
                break;
            default:
                return res.status(400).json({ error: 'Invalid collection name' });
        }
        
        const updatedPost = await collectionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/:collection/:id',authToken, async (req, res) => {
    const collectionName = req.params.collection;
    try {
        let collectionModel;
        switch (collectionName) {
            case 'pickups':
                collectionModel = pickup;
                break;
            case 'standups':
                collectionModel = standup;
                break;
            case 'familys':
                collectionModel = family;
                break;
            default:
                return res.status(400).json({ error: 'Invalid collection name' });
        }
        const deletedPost = await collectionModel.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports=router;

