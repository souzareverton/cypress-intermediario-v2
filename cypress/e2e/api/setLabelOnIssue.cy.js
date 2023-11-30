import { faker } from '@faker-js/faker';

describe('Criar Issue no Gitlab', () => {
    beforeEach(() => {
        cy.api_removeAllProjects();
        cy.login();
    });

    it.skip('criar uma issue com sucesso', () => {
        const label = {
            title: `label-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            color: '#122234',
            issue: {
                title: `issue-${faker.datatype.uuid()}`,
                description: faker.random.words(5),
                project: {
                    name: `project-${faker.datatype.uuid()}`,
                    description: faker.random.words(5),
                }
            }
        }
        cy.api_createLabel(label)
        .then(response => {
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal(label.title);
            expect(response.body.description).to.equal(label.description);
            expect(response.body.color).to.equal(label.color);
        });
        cy.gui_addLabelToIssue(label);
        cy.contains(label.title).should('be.visible');
        cy.get('div.qa-labels-block span').should('have.attr', 'style',`background-color: ${label.color}; color: #FFFFFF;`);
    });
});