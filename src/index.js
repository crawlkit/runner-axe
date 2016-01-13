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
      axe.a11yCheck(context || document, options || {}, function axeResults(results) {
        window.callPhantom(null, results.violations);
      });
    };
  }
}

module.exports = AxeRunner;
