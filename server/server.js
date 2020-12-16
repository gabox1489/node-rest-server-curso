require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//ESTABLECER LA CONEXION A LA BASE DE DATOS 

mongoose.connect('mongodb://127.0.0.1:27017/cafe', (err, res) => {
    if (err) throw err;

    console.log('Base de datos Online');
});



app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto : ', 3000);
});