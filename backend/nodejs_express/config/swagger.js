const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Mi Proyecto',
      version: '1.0.0',
      description: 'Documentación completa de la API REST',
      contact: {
        name: 'Albeiro Ramos',
        email: 'profealbeiro2020@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://192.168.0.7:3000',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID auto-generado'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario'
            },
            name: {
              type: 'string',
              description: 'Nombre del usuario'
            },
            lastname: {
              type: 'string',
              description: 'Apellido del usuario'
            },
            role: {
              type: 'string',
              enum: ['admin', 'seller', 'user'],
              description: 'Rol del usuario'
            }
          },
          example: {
            email: "juan@example.com",
            name: "Juan",
            lastname: "Pérez",
            role: "user"
          }
        },
        Login: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            password: {
              type: 'string'
            }
          },
          example: {
            email: "usuario@example.com",
            password: "miContraseña123"
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string'
            },
            message: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'], // Ruta de tus archivos de rutas
};

module.exports = swaggerJsdoc(options);