const express = require('express');
const cookirParser = require('cookie-parser');
const path = require('path');

const app = express();

app.set('view-engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookirParser());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.send('hy scatch');
})

app.listen(3000);