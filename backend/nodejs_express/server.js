// server.js
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const usersRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares globales
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Documentación de swagger
const swaggerOptions = {  
  swaggerOptions: {
    docExpansion: 'list',           
    defaultModelsExpandDepth: -1,   
    defaultModelExpandDepth: 1,     
    displayRequestDuration: true,   
    filter: false,                  
    layout: 'BaseLayout',  
    showExtensions: true,
    showCommonExtensions: true,
    deepLinking: true,         
    persistAuthorization: true,
    tagsSorter: 'alpha',       
    operationsSorter: function(a, b) {
      const methodOrder = { 'post': 1, 'get': 2, 'put': 3, 'delete': 4 };
      return methodOrder[a.get('method')] - methodOrder[b.get('method')];
    }  
  }  
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

// Rutas
app.use('/api/users', usersRoutes);

// Endpoints de prueba
app.get('/', (req, res) => {
    res.send('Ruta raíz del Backend');
});

app.get('/test', (req, res) => {
    res.send('Ruta TEST');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

console.log('📚 Swagger disponible en: http://192.168.0.7:3000/api-docs');

module.exports = app;