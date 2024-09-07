const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/scatch");

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
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: String,
    picture: String
});

module.exports = mongoose.model('user', userSchema);