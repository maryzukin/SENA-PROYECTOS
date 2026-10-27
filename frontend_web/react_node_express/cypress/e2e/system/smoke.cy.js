describe('Configuración de Cypress', () => {
  it('Cypress está funcionando correctamente', () => {
    expect(true).to.equal(true);
  });

  it('El frontend está corriendo y responde', () => {
    cy.visit('/');
    cy.contains('Sistema de Información Web');
  });
});