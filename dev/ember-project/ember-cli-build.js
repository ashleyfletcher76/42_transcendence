'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {});

  // Import Bootstrap CSS
  app.import('node_modules/bootstrap/dist/css/bootstrap.min.css');

  return app.toTree();
};
