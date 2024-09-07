const express = require('express');
const router = express.Router();

const ownerModel = require('../models/owner.model');

if(process.env.NODE_ENV === "development"){
    router.post('/create', async (req, res) => {
        const {fullname, email, password} = req.body;

        const owners = await ownerModel.find();
        if(owners.length > 0) return res.status(500).send("You dont have permission to create a new owner ⚠️");
        
        const createdOwner = await ownerModel.create({fullname, email, password});
        res.status(201).send(createdOwner);
    })
}

router.get('/admin', (req, res) => {
    res.render('createproducts');
})



module.exports = router;

// <% if(success.length>0){ %>
//     <div class="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md bg-blue-500">
//         <span class="inline-block mt-1 mb-1 text-white">
//             <%= success %>
//         </span>
//     </div>
//     <% } %>