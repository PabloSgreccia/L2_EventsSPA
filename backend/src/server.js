require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path");
const {json} = require('body-parser');
const app = express();

//Requerir router
const routerEvent = require('./routes/event.routes');
const routerUser = require('./routes/user.routes');
const routerType = require('./routes/type.routes');
const routerContac = require('./routes/contac.routes');

//Settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extend:false}));
app.use(json());

//Rutas
app.use('/api/type',routerType);
app.use('/api/event',routerEvent);
app.use('/api/user',routerUser);
app.use('/api/contac',routerContac);


app.use((req, res, next) => {
  res.status(404).json({
    status: '404',
    descripcion: 'Pagina no encontrada'
  })
})
  
module.exports = app;