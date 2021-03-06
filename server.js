const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
/* GET DB CONFIGURATION */
const dbconfig = require('./db');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const app = express();

/* MONGODB CONNECTIONS */
mongoose.connect(dbconfig.url + dbconfig.database, dbconfig.options, (err) => {
    if (err) throw err;
    console.log("Connected to Database : " + dbconfig.database);
})

/* SET VIEW ENGINE */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* MIDDLEWARES */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "assests")));

/* INDEX ROUTES */
app.use('/', require('./routes/index'));

/* START SERVER */
app.listen(port, () => {
    console.log("Server is Running on port : " + port);
})