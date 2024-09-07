const express = require('express');
const cookirParser = require('cookie-parser');
const path = require('path');
const ownerRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const index = require('./routes/index');
const expressSession = require('express-session');
const flash = require('connect-flash');

const db = require('./config/mongoose.connection');
require('dotenv').config();

const app = express();

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
)
app.use(flash());

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookirParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', index);
app.use('/owner', ownerRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    const error = ""; // Define the error variable
    res.render('index', { error });
});


app.listen(3000);