describe('Product and Cart Flow', () => {
    const baseUrl = 'http://localhost:3000';
  
    beforeEach(() => {
      cy.visit(baseUrl);
      cy.get('input[name=email]').type('user@example.com');
      cy.get('input[name=password]').type('password123');
      cy.get('button[type=submit]').click();
    });
  
    it('Loads product page and adds to cart', () => {
      cy.visit(`${baseUrl}/products`);
      cy.contains('Add to Cart').first().click();
      cy.visit(`${baseUrl}/cart`);
      cy.contains('Your Cart');
      cy.get('.cart-item').should('have.length.gte', 1); // Update based on your HTML
    });
  
    it('Removes item from cart', () => {
      // Add a product to the cart first
      cy.visit(`${baseUrl}/products`);
      cy.contains('Add to Cart').first().click();
      cy.visit(`${baseUrl}/cart`);
      cy.get('.remove-button').first().click();
      cy.contains('Your cart is empty').should('exist'); // if your cart shows this message
    });
  });
  