describe('Login', () => {

  it('realizar login com sucesso', () => {
    const user = Cypress.env('user_name');
    const password = Cypress.env('user_password');
    const options = {cachesession: false };
    
    cy.login(user, password, options);
    cy.get('.logo-text').should('be.visible');
  })
})