const express = require('express');
const Usuario = require('../models/usuario');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();

app.get('/usuario', function(req, res) {

    //REGRESAR LA LISTA DE TODOS LOS USUARIOS CREADOS :

    Usuario.find({ estado: true }, 'nombre email')
        .skip(3) //PARA SALTARSE LOS PRIMEROS 7 
        .limit(14) //PARA FILTRAR CUANTOS QUEREMOS MOSTRAR 
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });

        });
});

app.post('/usuario', function(req, res) {

    let body = req.body;

    //CREAMOS UN NUEVO OBJETO DE TIPO USUARIO

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    //GRABAMOS EL OBJETO EN LA BASE DE DATOS :

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }





        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});


app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    //UTILIZO MI LIBRERIA UNDERSCORE CON LOS DATOS QUE SI QUIERO ACTUALIZAR:
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);



    //USAMOS EL MODELO

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });



});




module.exports = app;