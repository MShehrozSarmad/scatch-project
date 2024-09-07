const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: String,
    picture: String
});

module.exports = mongoose.model('user', userSchema);