const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true, // Ocultar as credencias no plugins api
      requestMode: true, // para ter retorno visual para cy.request plugins api
      // snapshotOnly: true,
    },
    experimentalRunAllSpecs: true,
  },
  fixturesFolder: false, // Para não recriar a pasta de Fixture ao executar o Cypress
  video: false, // Para não gravar vídeo quando estiver rodando de forma headless
})