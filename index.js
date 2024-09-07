const express = require('express');
const cookirParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose.connection');
const ownerRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const index = require('./routes/index');

const app = express();

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


// <% if(error.length>0){ %>
//     <div class="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md bg-red-500">
//         <span class="inline-block mt-1 mb-1 text-white">
//             <%= error %>
//         </span>
//     </div>
//     <% } %>

app.listen(3000);