const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Reemplaza con tu URI de conexión a MongoDB
const mongoURI = 'mongodb://localhost:27017/Tienda';

// Conexión a MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor Express  essta funcionando');
});

// Importar el modelo de Usuario
const Usuario = require(path.join(__dirname, 'models', 'Usuario'));

// Crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Configurar puerto y ejecutar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

