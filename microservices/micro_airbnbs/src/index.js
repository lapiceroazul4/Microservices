const express = require('express');
const airbnbController = require("./controllers/airbnbController");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(airbnbController);

// Puerto de escucha
const port = 3002;
app.listen(port, () => {
    console.log(`Microservicio de Airbnbs escuchando en el puerto ${port}.`);
});