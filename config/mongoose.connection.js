const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`).then(() => {
    dbgr('db connected ✅');
}).catch((err) => {
    dbgr('db connection failed ❌ error::', err)
})

module.exports = mongoose.connection;