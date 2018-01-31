var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.get('/', (req, res, next) => {
    res.status(200).json({
        mensaje: 'Esto es un ejemplo',
        ok: true
    });
});

mongoose.connection.openUri('mongodb://192.168.1.199:27017/hospitaldb', (err, res) => {
    if (err) throw err;
    console.log('BD disponible');
});

app.listen(3000, () => {
    console.log('Express server corriendo en el puerto:', '3000');
});