import { faker } from "@faker-js/faker";


describe('create and setar Milestone on an Issue', () => {
    const milestone ={
        title: `milestone-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        issue: {
            title: `issue-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            project: {
                name: `project-${faker.datatype.uuid()}`,
                description: faker.random.words(5)
            }
        }
    };
    
    beforeEach(() => {
        cy.api_removeAllProjects();
        cy.api_createIssue(milestone.issue);
        cy.login();
    });

    it('Successfully', () => {
        cy.gui_createMilestone(milestone);

        cy.contains(milestone.title).should('be.visible');
        cy.contains(milestone.description).should('be.visible');

        cy.gui_addMilestoneToIssue(milestone);
        cy.get('.block.milestone').should('contain', milestone.title);// Verifica o título na sessão de milestone
    });
});