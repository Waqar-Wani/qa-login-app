describe('Login Functionality', () => {
  const baseUrl = 'http://localhost:3000';

  it('Loads login page', () => {
    cy.visit(baseUrl);
    cy.contains('Login');
    cy.get('input[name=email]').should('exist');
    cy.get('input[name=password]').should('exist');
    cy.get('button[type=submit]').should('exist');
  });

  it('Fails on wrong credentials', () => {
    cy.visit(baseUrl);
    cy.get('input[name=email]').type('wrong@example.com');
    cy.get('input[name=password]').type('wrongpass');
    cy.get('button[type=submit]').click();
    cy.contains('Invalid credentials.'); // Match the actual error message
  });

  it('Succeeds on valid credentials', () => {
    cy.visit(baseUrl);
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('password123');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/welcome');
  });
});
