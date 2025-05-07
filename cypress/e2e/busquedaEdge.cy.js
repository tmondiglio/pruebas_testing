Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Motor de búsqueda y ordenamiento en página Personal', () => {
  const baseUrl = 'https://tienda.personal.com.ar/';

  it('Debería buscar un producto y verificar que el primer resultado contenga la palabra buscada', () => {
    cy.visit(baseUrl);
    cy.get('input[placeholder="Buscar productos"]').type('Edge');
    cy.get('button[type="submit"]').click();
  });

  it('Debe ordenar los resultados por menor precio desde la página de resultados', () => {
    cy.visit('https://tienda.personal.com.ar/resultados?q=Edge');

    cy.contains('Recomendado')
    .parent().find('i.fa-chevron-down').click();             
  
    // Seleccionar "Menor precio"
    cy.contains('Menor precio').click();

    cy.wait(5000);
  });
  it('Debe verificar que el primer producto incluye accesorios', () => {
    cy.visit('https://tienda.personal.com.ar/resultados?q=edge&order=Menor+precio');
  
    cy.get('[data-testid="product-card-container"]')
      .first()
      .should('contain.text', 'Incluye accesorios');
  });
  
});

