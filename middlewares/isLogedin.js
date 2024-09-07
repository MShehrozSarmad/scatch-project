const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

module.exports = async (req, res, next) => {
    if(!req.cookies.token) {
        req.flash('error', 'you must be logged in first ⚠️');
        return res.redirect('/');
    }else{
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            const user = await userModel.findOne({email: decoded.email}).select('-password');
            req.user = user
            next();
        } catch (error) {
            req.flash('error', error.message);
            res.redirect('/');
        }
    }
}