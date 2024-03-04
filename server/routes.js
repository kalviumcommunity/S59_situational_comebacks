const express = require('express');
const router = express.Router();
const {connectDB} = require('./db')
const family = require('./modals/family')
const pickup = require('./modals/pickup')
const standup = require('./modals/standup')
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



// router.get("/",async(req,res)=>{
//     try{
//         const pickups = await pickup.find()
//         res.json(pickups)
//     }
//     catch(err){
//         res.status(500).send("Error occured : ")
//     }
// })

// router.get('/:id',async(req,res)=>{
//     try{
//         const pickups = await pickup.findById(req.params.id)
//         res.json(pickups)
//     }
//     catch(err){
//         res.status(500).send('error')
//     }
// });

// router.post('/add',async(req,res)=>{
//     try{
//         const pickups= new pickup(req.body)
//         const xyz = await pickups.save()
//         res.json(xyz)
//     }
//     catch(err){
//         res.status(500).send('error')
//     }
// })

// router.put('/:id',async(req,res)=>{
//     try{
//         const pickups = await pickup.findByIdAndUpdate(req.params.id, req.body,{new: true});
//         if(!pickups){
//             return res.status(404).send('Pickup Not Found');
//         }
//         else{
//             res.json(pickups);
//         }
//     }
//     catch(err){
//         res.status(500).send("Error");
//     }
// });

// router.patch('/:id',async (req,res)=>{
//     try{
//         const pickups = await pickup.findByIdAndUpdate(req.params.id, req.body,{new: true});
//         if(!pickups){
//             return res.status(404).send('Pickup Not Found');
//         }
//         else{
//             res.json(pickups);
//         }
//     }
//     catch(err){
//         res.status(500).send("Error");
//     }
// })

// router.delete('/:id',async (req,res)=>{
//     try{
//         const pickups= await pickup.findByIdAndDelete(req.params.id);
//         if(!pickups){
//             return res.status(404).send('Pickup not found');
//         }
//         res.send('Pickup deleted successfully');
//     }
//     catch(err){
//         res.status(500).send('Error deleting pickup')
//     }
// })



module.exports=router;