const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const dbconfig = require('./db');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const app = express();

mongoose.connect(dbconfig.url + dbconfig.database, dbconfig.options, (err) => {
    if (err) throw err;
    console.log("Connected to Database : " + dbconfig.database);
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "assests")));

app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log("Server is Running on port : " + port);
})