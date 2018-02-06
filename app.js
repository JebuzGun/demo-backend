var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

//rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);



mongoose.connection.openUri('mongodb://192.168.1.199:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('BD disponible');
});

app.listen(3000, () => {
    console.log('Express server corriendo en el puerto:', '3000');
});