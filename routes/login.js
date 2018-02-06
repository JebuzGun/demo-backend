var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var app = express();
var Usuario = require('../models/usuario');

app.post('/', (req, res) => {
    var body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error en el ingreso',
                ok: false,
                errors: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                mensaje: 'Credenciales incorrectas',
                ok: false
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                mensaje: 'Credenciales incorrectas',
                ok: false,
                errors: err
            });
        } else {
            //crear un token
            var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });
            usuarioDB.password = ":)";
            return res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB._id
            });
        }
    });
});
module.exports = app;