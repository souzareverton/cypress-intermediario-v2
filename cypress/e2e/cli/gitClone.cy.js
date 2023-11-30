import { faker } from '@faker-js/faker';

describe('git clone', () => {
    const project = {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    };

    beforeEach(() => {
        cy.api_removeAllProjects();
        cy.api_createProject(project);
    });

    it('Successfully', () => {
        cy.cloneViaSsh(project);
        cy.readFile(`cypress/downloads/${project.name}/README.md`)
            .should('contain', `# ${project.name}`)
            .and('contain', project.description);
    });
});