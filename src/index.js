'use strict'; // eslint-disable-line
const path = require('path');

class AxeRunner {
  getCompanionFiles() {
    return [
      require.resolve(path.join('axe-core', 'axe.js')),
    ];
  }

  /* global axe:false */
  getRunnable() {
    return function axeRunner(options, context) {
      function axeResults(results) {
        window.callPhantom(null, results.violations);
      }
      axe.a11yCheck(context || document, options || {}, axeResults);
    };
  }
}

module.exports = AxeRunner;
