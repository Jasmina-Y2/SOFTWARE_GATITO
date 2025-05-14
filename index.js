const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expedienteController = require('./Controller/controller');

// Configuración del servidor
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('Public'));

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Rutas
app.use('/', expedienteController);

// Ruta principal
app.get('/', (req, res) => {
    res.render('inicio'); 
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
