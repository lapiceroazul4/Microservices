const express = require('express');
const router = express.Router();
const axios = require('axios');

const reservasModel = require('../models/reservasModel');

router.get("/reservas", async (req, res) => {
    var result;
    result = await reservasModel.obtenerTodasLasReservas();
    res.json(result);
  });
  
router.get("/reservas/id/:id", async (req, res) => {
    const reserva_id = req.params.id;
    var result;
    result = await reservasModel.obtenerReservaPorId(reserva_id);
    res.json(result[0]);
});

router.delete('/reservas/id/:id', async (req, res) => {
    const result = await airbnbModel.eliminarReserva(req.params.reserva_id);
    res.json({ message: `${result}` });
});

router.post("/reservas", async (req, res) => {
    const user_id = req.body.user_id;
    const airbnb_id = req.body.airbnb_id;
    var result;

    result = await validarReserva({ params: { user_id, airbnb_id } }, res);
    //result = await reservasModel.crearReserva(user_id, airbnb_id);
});

// Función para crear una reserva
async function validarReserva(req, res) {
  try {
    const { airbnb_id, user_id} = req.params;

    // Verificar si el usuario y el airbnb existen antes de crear la reserva
    const [userResponse, airbnbResponse] = await Promise.all([
      axios.get(`http://localhost:3001/usuarios/${user_id}`),
      axios.get(`http://localhost:3002/airbnbs/id/${airbnb_id}`)
    ]);

    if (!userResponse.data || !airbnbResponse.data) {
      return res.status(404).json({ error: 'Usuario o Airbnb no encontrado' });
    }

    // Crear la reserva
    const reserva = {
      airbnb_id,
      user_id,
    };

    var result;
    result = await reservasModel.crearReserva(reserva);


    return res.status(201).json(result);
  } catch (error) {
    console.error('Error al crear reserva:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = router;
