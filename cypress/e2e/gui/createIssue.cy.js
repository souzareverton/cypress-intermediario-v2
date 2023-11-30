import { faker } from '@faker-js/faker';

describe('Criar Issue no Gitlab', () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
        }
    }

    beforeEach(() => {
        cy.api_removeAllProjects();
        cy.api_createProject(issue.project);
        cy.login();
    });

    it('criar uma issue com sucesso', () => {
        cy.gui_createIssue(issue);
        
        cy.contains(issue.title).should('be.visible');
        cy.contains(issue.description).should('be.visible');
    });
});