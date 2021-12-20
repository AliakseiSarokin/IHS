import {SpecReporter} from "jasmine-spec-reporter";
const specReporter = new SpecReporter();


export function initializeReporters() {

    jasmine.getEnv().addReporter(specReporter);

    const jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
    jasmine.getEnv().addReporter(
        new jasmine2HtmlReporter({
            savePath: './output/jasmineHtmlReport',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true,
            fixedScreenshotName: true,
        })
    );

    const jasmineReporters = require('jasmine-reporters');
    const junitReporter = new jasmineReporters.JUnitXmlReporter({

        savePath: './output/',

        // conslidate all true:
        //   output/junitresults.xml
        //
        // conslidate all set to false:
        //   output/junitresults-example1.xml
        //   output/junitresults-example2.xml
        consolidateAll: false

    });
    jasmine.getEnv().addReporter(junitReporter);

    const allureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new allureReporter({
        resultsDir: './allure-results',
    }) as any);
}
