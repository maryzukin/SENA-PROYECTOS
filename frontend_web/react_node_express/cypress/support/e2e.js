// frontend_web/react_node_express/cypress/support/e2e.js
import './commands.js';

// Silencia errores no capturados de React en desarrollo
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});