const { Router } = require('express');
const router = Router();
const usuariosModel = require('../models/usuariosModel');
const axios = require('axios');

router.get('/usuarios', async (req, res) => {
    var result;
    result = await usuariosModel.traerUsuarios();
    res.json(result);
}); // funciona, no tocar

router.get('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    var result;
    result = await usuariosModel.traerUsuario(id);
    res.json(result[0]);
}); // funciona, no tocar

router.get('/user/validation', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    var result;
    result = await usuariosModel.validarUsuario(email, password);
    res.json(result);
}); // no funciona, hay que tocar

router.delete('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    var result = await usuariosModel.borrarUsuario(id);
    res.send("usuario eliminado");
    }); // funciona, no tocar

router.post('/usuarios/crearusuario', async (req, res) => {
    const user_id = req.body.user_id;
    const name = req.body.name;
    const role = req.body.role;
    const password = req.body.password;
    var result = await usuariosModel.crearUsuario(user_id, name, role, password);
    res.send("usuario creado");
}); // funciona, no tocar

module.exports = router;
