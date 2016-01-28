# aXe runner
[![Build status](https://img.shields.io/travis/crawlkit/runner-axe/master.svg)](https://travis-ci.org/crawlkit/runner-axe)
[![npm](https://img.shields.io/npm/v/crawlkit-runner-axe.svg)](https://www.npmjs.com/package/crawlkit-runner-axe)
[![npm](https://img.shields.io/npm/l/crawlkit-runner-axe.svg)]()
[![David](https://img.shields.io/david/crawlkit/runner-axe.svg)]()
[![node](https://img.shields.io/node/v/crawlkit-runner-axe.svg)]()
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This runner can be used with [CrawlKit](https://github.com/crawlkit/crawlkit) in order to audit a website with the [aXe](https://github.com/dequelabs/axe-core) accessibility engine.

## Install
```console
npm install crawlkit-runner-axe --save
```

## Example
```javascript
const CrawlKit = require('crawlkit');
const AxeRunner = require('crawlkit-runner-axe');

const crawler = new CrawlKit('http://your/page');
// You could add a finder here in order to audit a whole network of pages
crawler.addRunner('aXe', new AxeRunner());

crawler.crawl()
    .then((data) => {
        console.log(JSON.stringify(data.results, true, 2));
    }, (err) => console.error(err));
```

## Configuring the aXe runner

### Passing options
You can pass an options object to the aXe runner like this:
```javascript
crawler.addRunner('aXe', new AxeRunner(), {
  runOnly: {
      type: 'tag',
      values: ['wcag2aa']
    }
});
```
For a list of options and the structure of the options object, please consult the [aXe API](https://github.com/dequelabs/axe-core/blob/master/doc/API.md#a11ycheck-parameters).

### Defining context
You can define the context the aXe runner should use like this:
```javascript
crawler.addRunner('aXe', new AxeRunner(), null, '.my-context');
```
By default, the context is `document`. Please bear in mind that only selector contexts work, as the code of the aXe runner itself runs in node.

This project is in no way affiliated with Deque Labs.
