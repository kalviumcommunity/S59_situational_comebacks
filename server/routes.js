const express = require('express');
const router = express.Router();
const {connectDB} = require('./db')
const family = require('./modals/family')
const pickup = require('./modals/pickup')
const standup = require('./modals/standup')
const post=require('./modals/post')
const schema = require('./joiSchema')
connectDB()



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
    const data = await family.find()
    res.send(data)
}); 



router.post('/:collection', async (req, res) => {
    const collectionName = req.params.collection;
    try {
        const {error} =schema.validate(req.body)
        if(error){
            res.json({error:"Please return proper data"})
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
    } catch (error) {
        res.status(400).json({ error: 'Failed to add data', "req.body": req.body });
    }
});

router.put('/:collection/:id', async (req, res) => {
    const collectionName = req.params.collection;
    try {
        const {error} =schema.validate(req.body)
        if(error){
            res.json({error:"Please return proper data"})
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
        
        const updatedPost = await collectionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/:collection/:id', async (req, res) => {
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

