// frontend_web/react_node_express/cypress/support/commands.js

Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: 'http://192.168.0.7:3000/api/users/login', // Asegúrese de que su backend corra aquí
    body: { email, password },
  }).then((response) => {
    expect(response.status).to.eq(201);
    const token = response.body.data.session_token.replace('JWT ', '');
    
    // Guardamos el token en el localStorage simulando a React
    window.localStorage.setItem('auth_token', token);
    window.localStorage.setItem('user_data', JSON.stringify(response.body.data));
  });
});