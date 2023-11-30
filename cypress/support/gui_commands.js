Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    {cachesession = true } = {}, // Definir se será executado como o session ou não
) => {
    const login = () => { 
        cy.visit('/users/sign_in');

        cy.get('[data-qa-selector="login_field"]').type(user);
        cy.get('[data-qa-selector="password_field"]').type(password, { log: false });
        cy.get('[data-qa-selector="sign_in_button"]').click();
    }

    const validate = () => {  //Criterio que identifica se a session está válida ou não
        cy.visit('/');
        cy.location('pathname', { timeout: 1000 }) // caso o pathname(URL) seja de sign_in, significa que a session quebrou e que eu preciso logar de novo
          .should('not.eq', '/users/sign_in'); // Serve para validar se o usuário está logado ou não, se está na tela de login, não tá logado
    }

    const option = {
        cacheAcrossSpecs: true, // Compartilhar a cache entre os arquivos logout, createProject, etc
        validate  //A função é passada nas opções para ser utilizada pelo cy.session para validar se tá na tela de login ou não
    }

    if(cachesession){
        cy.session(user, login, option); // cria, restaura ou recria a sessão
    }else{
        login();
    }
})

Cypress.Commands.add('logout', () => {
    // const logout = () => {
        cy.get('.qa-user-avatar').click();
        cy.contains('Sign out').click();
    // }
    
    // logout();
})

Cypress.Commands.add('gui_createProject', (project) => {
    // cy.get('#js-onboarding-new-project-link').click(); 
    // cy.contains('New project').click();
    cy.visit('/projects/new'); //Navega direto para a URL de criação do projeto

    cy.get('#project_name').type(project.name);
    cy.get('#project_description').type(project.description);
    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click();
})

Cypress.Commands.add('gui_createIssue', (issue) => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`);

    cy.get('#issue_title').type(issue.title);
    cy.get('#issue_description').type(issue.description);
    cy.contains('Submit issue').click();
})

Cypress.Commands.add('gui_createLabel', (label) => {
    cy.visit(`${Cypress.env('user_name')}/${label.issue.project.name}/-/labels/new`);

    cy.get('#label_title').type(label.title);
    cy.get('#label_description').type(label.description);
    cy.get('#label_color').type(`{selectAll}${label.color}`);
    cy.get('.qa-label-create-button').click();
});

Cypress.Commands.add('gui_addLabelToIssue', (label) => {
    cy.visit(`${Cypress.env('user_name')}/${label.issue.project.name}/issues/1`);

    cy.get('.qa-edit-link-labels').click();
    cy.contains(label.title).click();
    cy.get('.qa-title').click();
});

Cypress.Commands.add('gui_createMilestone', (milestone) => {
    cy.visit(`${Cypress.env('user_name')}/${milestone.issue.project.name}/-/milestones/new`);

    cy.get('.qa-milestone-title').type(milestone.title);
    cy.get('.qa-milestone-description').type(milestone.description);
    cy.contains('Create milestone').click();
});

Cypress.Commands.add('gui_addMilestoneToIssue', (milestone) => {
    cy.visit(`${Cypress.env('user_name')}/${milestone.issue.project.name}/issues/1`);

    cy.get('.block.milestone .edit-link').click();
    cy.contains(milestone.title).click();
});