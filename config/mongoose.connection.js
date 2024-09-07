const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/scatch').then(() => {
    console.log('db connected ✅');
}).catch((err) => {
    console.log('db connection failed ❌ error::', err)
})

module.exports = mongoose.connection;