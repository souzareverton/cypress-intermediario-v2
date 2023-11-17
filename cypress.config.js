const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
  },
  fixturesFolder: false, // Para não recriar a pasta de Fixture ao executar o Cypress
  video: false, // Para não gravar vídeo quando estiver rodando de forma headless
})