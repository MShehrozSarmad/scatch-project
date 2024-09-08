const express = require('express');
const isLogedin = require('../middlewares/isLogedin');
const router = express.Router();
const productModel = require('../models/product.model');
const userModel = require('../models/user.model');

router.get('/', (req, res) => {
    let error = req.flash('error');
    res.render("index", {error, loggedin: false});
});

router.get('/shop', isLogedin, async (req, res) => {
    const products = await productModel.find();
    const success = req.flash('success');
    res.render('shop', {products, success});
});

router.get('/addtocart/:productid', isLogedin, async (req, res) => {
    const user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash('success', 'added to cart successfully');
    res.redirect('/shop');
})

router.get('/cart', isLogedin, async (req, res) => {
    const user = await userModel.findOne({email: req.user.email}).populate('cart');
    const bill = user.cart[0].price + 20 - user.cart[0].discount;
    res.render('cart', {cart: user.cart, bill});
})

module.exports = router