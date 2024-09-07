const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        tpye: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: String,
    picture: String
});

module.exports = mongoose.model('user', userSchema);