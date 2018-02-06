const express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var app = express();
var mdAutenticacion = require('../middlewares/autenticacion');
var Usuario = require('../models/usuario');

//Obtener todos los usuarios
app.get('/', (req, res, next) => {
    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    res.status(500).json({
                        mensaje: 'Error cargando usuarios',
                        ok: false,
                        errors: err
                    });
                }
                res.status(200).json({
                    usuarios: usuarios,
                    ok: true
                });
            });
});
//Crear usuario
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });
    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                mensaje: 'Error creando usuario',
                ok: false,
                errors: err
            });
        } else {
            res.status(201).json({
                usuario: usuarioGuardado,
                ok: true,
                usuarioToken: req.usuario
            });
        }
    });
});
//Actualizar usuario
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error buscando usuario',
                ok: false,
                errors: err
            });
        }
        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado',
                ok: false,
                errors: err
            });
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;
        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    mensaje: 'Usuario no actualizado',
                    ok: false,
                    errors: err
                });
            }
            usuarioGuardado.password = ":)";
            res.status(200).json({
                usuario: usuarioGuardado,
                ok: true
            });
        });
    });
});
//Eliminar usuario
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, userDeleted) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Usuario no borrado',
                ok: false,
                errors: err
            });
        }
        if (!userDeleted) {
            return res.status(400).json({
                mensaje: 'Usuario no encontrado',
                ok: false,
            });
        }
        res.status(200).json({
            usuario: userDeleted,
            ok: true
        });
    });
});

module.exports = app;