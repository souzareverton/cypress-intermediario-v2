import { faker } from "@faker-js/faker";


describe('create and setar Label on an Issue', () => {
    const label ={
        title: `label-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        color: '#122234',
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
        cy.api_createIssue(label.issue);
        cy.login();
    });

    it('Successfully', () => {
        cy.gui_createLabel(label);

        cy.contains(label.title).should('be.visible');
        cy.contains(label.description).should('be.visible');

        cy.gui_addLabelToIssue(label);
        cy.contains(label.title).should('be.visible');
        cy.get('div.qa-labels-block span').should('have.attr', 'style',`background-color: ${label.color}; color: #FFFFFF;`);
        // No atributo de style tem o background-color
    });
});