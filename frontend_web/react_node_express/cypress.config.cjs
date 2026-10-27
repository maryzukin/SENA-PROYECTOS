// frontend_web/react_node_express/cypress.config.cjs
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // URL de Vite
    defaultCommandTimeout: 10000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    video: false,
    screenshotOnRunFailure: true,
    reporter: 'spec',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});