const express = require('express');
const isLogedin = require('../middlewares/isLogedin');
const router = express.Router();

router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render("index", {error});
});

router.get('/shop', isLogedin, (req, res) => {
    res.render('shop');
})

module.exports = router