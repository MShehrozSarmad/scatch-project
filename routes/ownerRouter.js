const express = require('express');
const router = express.Router();

const ownerModel = require('../models/owner.model');

console.log(process.env.NODE_ENV);

router.get('/', (req, res) => {
    res.send('hy working!');
})


if(process.env.NODE_ENV === "development"){
    router.post('/create', async (req, res) => {
        const {fullname, email, password} = req.body;

        const owners = await ownerModel.find();
        if(owners.length > 0) return res.status(500).send("You dont have permission to create a new owner ⚠️");
        
        const createdOwner = await ownerModel.create({fullname, email, password});
        res.status(201).send(createdOwner);
    })
}

module.exports = router;

