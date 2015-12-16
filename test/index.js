'use strict'; // eslint-disable-line
const path = require('path');
const pkg = require('../package.json');
const AxeRunner = require(path.join(__dirname, '..', pkg.main));
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const CrawlKit = require('crawlkit');
const freeport = require('freeport');
const httpServer = require('http-server');

chai.should();
chai.use(chaiAsPromised);

describe('Axe runner', function main() {
    this.timeout(60 * 1000); // auditing can take a while
    let server;
    let url;
    let port;
    const host = '0.0.0.0';

    before((done) => {
        freeport((err, p) => {
            if (err) {
                throw err;
            }
            port = p;
            server = httpServer.createServer({
                root: path.join(__dirname, 'fixtures', 'website'),
            });
            server.listen(port);
            url = `http://${host}:${port}`;
            done();
        });
    });

    after(() => {
        server.close();
    });

    it('should be able to audit a website', () => {
        const crawler = new CrawlKit(url);
        crawler.addRunner('axe', new AxeRunner());

        const results = {};
        results[`${url}/`] = {
            runners: {
                'axe': {
                    result: require(path.join(__dirname, 'fixtures/results/index.json')),
                },
            },
        };
        return crawler.crawl().should.eventually.deep.equal({ results });
    });

    it('should be possible to pass options to the runner', () => {
        const crawler = new CrawlKit(url);
        crawler.addRunner('axe', new AxeRunner(), {
            runOnly: {
              type: 'rule',
              values: ['html-lang'],
            },
        });

        const results = {};
        results[`${url}/`] = {
            runners: {
                'axe': {
                    result: require(path.join(__dirname, 'fixtures/results/index.rule.html-lang.json')),
                },
            },
        };
        return crawler.crawl().should.eventually.deep.equal({ results });
    });

    it('should be possible to set the context', () => {
        const buttonUrl = `${url}/button.html`;
        const crawler = new CrawlKit(buttonUrl);
        crawler.addRunner('axe', new AxeRunner(), null, '#good');

        const results = {};
        results[buttonUrl] = {
            runners: {
                'axe': {
                    result: [],
                },
            },
        };
        return crawler.crawl().should.eventually.deep.equal({ results });
    });
});
