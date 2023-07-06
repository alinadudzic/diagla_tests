const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://diagla.vot.pl/',
    chromeWebSecurity: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    testIsolation: false,
  },
})

