const express = require('express');
const cookirParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose.connection');
const ownerRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookirParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/owner', ownerRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000);