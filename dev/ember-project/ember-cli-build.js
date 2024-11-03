'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Configure the proxy for API requests
    proxy: {
      '/api1/': {
        target: 'https://host.docker.internal:9443', // Change this to your API's base URL
        changeOrigin: true,
        secure: false, // Set to true if using valid SSL certificates
      },
      '/api2/': {
        target: 'https://host.docker.internal:8443', // Change this to your API's base URL
        changeOrigin: true,
        secure: false, // Set to true if using valid SSL certificates
      }
    }
  });

  // Import Bootstrap CSS
  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css');

  return app.toTree();
};
