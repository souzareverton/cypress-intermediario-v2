const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`;

Cypress.Commands.add('api_createProject', project => {
    cy.request({
        method: 'POST',
        url: '/api/v4/projects/',
        body: {
            name: project.name,
            description: project.description,
            initialize_with_readme: true
        },
        headers: { Authorization: accessToken }, //Authorization recebe o token 
    });
});

Cypress.Commands.add('api_createIssue', (issue) => {
     cy.api_createProject(issue.project).then( response => {
        cy.request({
            method: 'POST',
            url: `/api/v4/projects/${response.body.id}/issues`, //response.body.id pega o id do projeto criado acima
            body: {
                title: issue.title,
                description: issue.description,
            },
            headers: { Authorization: accessToken },
        });
     });     
});

//Minha solução exercicio 2 aula 6
Cypress.Commands.add('api_removeAllProjects', () => {
    cy.request({
        method: 'GET',
        url: '/api/v4/projects/',
        headers: { Authorization: accessToken },
    }).then(response => {
        if (response.body.lenght >= 1){
            response.body.forEach(project => {
                cy.request({
                    method: 'DELETE',
                    url: '/api/v4/projects/'+project.id,
                    headers: { Authorization: accessToken },
                });
            });
        }
    });
});

// Solução professor exercico 2 aula 6
Cypress.Commands.add('api_getAllProjects', () => {
    cy.request({
      method: 'GET',
      url: '/api/v4/projects/',
      headers: { Authorization: accessToken },
    })
  });
  
  Cypress.Commands.add('api_deleteProjects', () => {
    cy.api_getAllProjects().then(res =>
      res.body.forEach(project => cy.request({
        method: 'DELETE',
        url: `/api/v4/projects/${project.id}`,
        headers: { Authorization: accessToken },
      }))
    )
  });

  Cypress.Commands.add('api_createLabel', (label) => {
    cy.api_createIssue(label.issue).then(response => {
        alert(response.body.project_id);
        cy.request({
            method: 'POST',
            url: `/api/v4/projects/${response.body.project_id}/labels`,
            body: {
                name: label.name,
                color: label.color
            },
            headers: { Authorization: accessToken },
        });
    });
  });