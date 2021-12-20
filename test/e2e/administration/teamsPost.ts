import { browser, element, by, ExpectedConditions, protractor} from 'protractor'
import { Alert, WebElement } from 'selenium-webdriver';
import {TeamsPushMessage} from './../../../helper/teamsPushMessage';
describe('Publish results to teams', () =>  {

    it('CSV File Operations', async ()=> {

/*
        const papa = require('papaparse');
        const fs = require('fs');

        const file = fs.readFileSync('C:\\Users\\surajkumar.behera\\Downloads\\allure-report (89)\\allure-report\\data\\behaviors.csv', 'utf8');
        let results = papa.parse(file, {
            header: true
        });
        console.log("*************Complete CSV file*************");
        console.log(await results.data["meta"]);

        // get first row
        let firstRow = await results.data[0];
        console.log("@@@@@@@@ First Row from file @@@@@@@@@@@@@@@");
        //console.log(await results);
        console.log("FAILED : "+firstRow["FAILED"]);
        console.log("BROKEN : "+firstRow["BROKEN"]);
        console.log("PASSED : "+firstRow["PASSED"]);
        console.log("SKIPPED : "+firstRow["SKIPPED"]);
        let passPcntg:number = (parseInt(firstRow["PASSED"])/(parseInt(firstRow["FAILED"])+parseInt(firstRow["BROKEN"])+parseInt(firstRow["SKIPPED"])+parseInt(firstRow["PASSED"])))*100;
        console.log('>>>>>>>>>>>>>>'+passPcntg.toFixed(2));
        console.log('>>>>>>>>>>>>>askhsakdhakdhaksdhsakj>>>>>'+(parseInt(firstRow["FAILED"])+parseInt(firstRow["BROKEN"])+parseInt(firstRow["SKIPPED"])+parseInt(firstRow["PASSED"])));

*/
        let json:any = TeamsPushMessage.readCSV();

    });

});