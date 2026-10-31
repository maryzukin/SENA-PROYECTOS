// cypress/e2e/system/users.system.cy.js

describe('Nivel 4: Pruebas de Sistema (E2E) - Flujos Completos', () => {

  // ✅ IMPORTANTE: Limpiamos el localStorage antes de cada prueba 
  // para evitar que se guarde el token viejo con el rol equivocado.
  beforeEach(() => {
    cy.clearLocalStorage();
  });
  
  // ST-01: Login exitoso y redirección
  it('ST-01: Debe permitir el login y redirigir al Dashboard', () => {
    cy.visit('/login');
    
    cy.get('input[type="email"]').type('admin@test.com');
    cy.get('input[type="password"]').type('password123'); // 👈 Reemplace con su contraseña
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Bienvenido,').should('be.visible');
  });

  // ST-02: Protección de Rutas
  it('ST-02: Debe redirigir al login si se intenta acceder al Dashboard sin estar autenticado', () => {
    cy.clearLocalStorage();
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });

    // ST-03: Crear un usuario desde la interfaz gráfica
  it('ST-03: Debe crear un usuario a través del formulario y mostrarlo en la tabla', () => {
    cy.login('admin@test.com', 'password123');
    cy.visit('/dashboard');
    
    // 1. Navegar a la tabla de usuarios
    cy.contains('Usuarios').click(); // Quitamos 'button' por si es un <a> o <li>
    
    // 2. Abrir el formulario (aquí estaba el error del '+')
    // Usamos un selector flexible: que busque "Nuevo Usuario" o "Agregar Usuario"
    cy.contains(/Nuevo Usuario|Agregar Usuario|Crear Usuario/i).click(); 
    
    const emailUnico = `cypress_${Date.now()}@test.com`;
    cy.get('input[name="name"]').type('Usuario Creado por Cypress');
    cy.get('input[name="lastname"]').type('ApellidoTest');
    cy.get('input[name="email"]').type(emailUnico);
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    
    // 3. Guardar (puede decir 'Crear' o 'Guardar')
    cy.contains(/Crear|Guardar|Registrar/i).click();
    
    // 4. Verificar éxito
    cy.contains('Operación completada exitosamente').should('be.visible');
    cy.get('table').should('contain', emailUnico);
  });

  // ST-04: Eliminar un usuario desde la interfaz gráfica
  it('ST-04: Debe eliminar un usuario de la tabla', () => {
    cy.login('admin@test.com', 'password123');
    cy.visit('/dashboard');
    cy.contains('Usuarios').click();

    // 1. Para asegurar que el usuario exista en la tabla, lo creamos usando la interfaz
    // (Así evitamos fallos de actualización de la tabla con el cy.request)
    cy.contains(/Nuevo Usuario|Agregar Usuario|Crear Usuario/i).click(); 
    
    const emailAEliminar = `eliminar_${Date.now()}@test.com`;
    cy.get('input[name="name"]').type('Para Borrar');
    cy.get('input[name="lastname"]').type('Test');
    cy.get('input[name="email"]').type(emailAEliminar);
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    
    cy.contains(/Crear|Guardar|Registrar/i).click();
    cy.contains('Operación completada exitosamente').should('be.visible');

    // 2. Ahora buscamos la fila y hacemos clic en el botón de eliminar
    cy.contains('tr', emailAEliminar).within(() => {
      // Busca cualquier botón que tenga un ícono de eliminar, o la clase btn-delete
      cy.get('button.btn-delete, button').contains(/Eliminar|Borrar|🗑️/i).click();
    });

    // Aceptar la ventana de confirmación del navegador
    cy.on('window:confirm', () => true);

    // 3. Verificar que se eliminó
    cy.contains('Usuario eliminado exitosamente').should('be.visible');
    cy.get('table').should('not.contain', emailAEliminar);
  });

  // ST-05: Validación de UI
  it('ST-05: Debe mostrar un mensaje de error si se intenta hacer login con campos vacíos', () => {
    cy.visit('/login');
    cy.get('button[type="submit"]').click();
    cy.contains('Por favor complete todos los campos').should('be.visible');
  });

});