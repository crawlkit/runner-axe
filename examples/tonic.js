/* eslint-disable no-console */
const CrawlKit = require('crawlkit');
const AxeRunner = require('crawlkit-runner-axe');

const crawler = new CrawlKit('http://www.google.com');
crawler.addRunner('aXe', new AxeRunner());

crawler.crawl()
    .then((data) => {
        console.log(JSON.stringify(data.results, true, 2));
    });
