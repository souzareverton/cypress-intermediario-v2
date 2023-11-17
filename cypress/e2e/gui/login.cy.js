describe('Login', () => {

  it('realizar login com sucesso', () => {
    cy.login();
    cy.get('.logo-text').should('be.visible');
  })

  it.only('realizar logout com sucesso', () => {
    cy.login();
    cy.get('.qa-user-avatar').should('be.visible');
    cy.logout();
    cy.get('[data-qa-selector="login_field"]').should('be.visible');
    cy.get('[data-qa-selector="password_field"]').should('be.visible');
    cy.get('[data-qa-selector="sign_in_button"]').should('be.visible');
  });
})