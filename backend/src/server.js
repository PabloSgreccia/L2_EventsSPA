require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path");
const {json} = require('body-parser');
const app = express();

const myCron = require('./config/cron'); // Import the cron

// Documentation
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerOptions=require('./utils/swagger-options')
const setup = swaggerJsDoc(swaggerOptions)


// Router required
const routerEvent = require('./routes/event.routes');
const routerUser = require('./routes/user.routes');
const routerType = require('./routes/type.routes');
const routerContact = require('./routes/contact.routes');


// Settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extend:false}));
app.use(json());
app.use(express.static(process.env.STATIC)) 


// Routes
app.use('/api/type',routerType);
app.use('/api/event',routerEvent);
app.use('/api/user',routerUser);
app.use('/api/contact',routerContact);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(setup))



app.use((req, res, next) => {
  res.status(404).json({
    status: '404',
    descripcion: 'Pagina no encontrada'
  })
})
  
module.exports = app;