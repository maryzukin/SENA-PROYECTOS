// backend/nodejs_express/jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'], // Busca archivos .test.js en la carpeta tests
  verbose: true,
  forceExit: true, // Fuerza la salida después de las pruebas (útil por las conexiones a BD)
  clearMocks: true,
  // Reportes que configuraremos en el Punto 10
  reporters: ['default'],
};