describe('Login', () => {
    beforeEach(() => {
        cy.login();
        cy.visit("/");
    });
  
    it.only('realizar logout com sucesso', () => {
      cy.logout();
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
      cy.get('[data-qa-selector="login_field"]').should('be.visible');
      cy.get('[data-qa-selector="password_field"]').should('be.visible');
      cy.get('[data-qa-selector="sign_in_button"]').should('be.visible');
    });
  })