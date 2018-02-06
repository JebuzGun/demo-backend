const express = require('express');
var app = express();

app.get('/', (req, res, next) => {
    res.status(200).json({
        mensaje: 'Esto es un ejemplo',
        ok: true
    });
});

module.exports = app;