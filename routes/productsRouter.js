const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const productModel = require("../models/product.model");

router.post("/create", upload.single("image"), async (req, res) => {
  const { name, price, discount, bgcolor, pannelcolor, textcolor } = req.body;
  try {
    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      pannelcolor,
      textcolor,
    });
    req.flash('success', 'product created successfully');
    res.redirect('/owner/admin');
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
