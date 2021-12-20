import {browser} from "protractor";
import {File} from "../utils/file";
import {Login} from "../components/login";
import {envs, IUserLogin} from "../api/testData/global";
import {allureStep} from "./allure/allureSteps";
import * as  unirest from "unirest";

const file: File = new File();
const login: Login = new Login();

export class TeamsPushMessage {

    public static async readCSV(){

        const papa = require('papaparse');
        const fs = require('fs');
        const file = fs.readFileSync('./allure-report/data/behaviors.csv', 'utf8');
        const results = papa.parse(file, {
            header: true
        });
        const firstRow = await results.data[0];
        const passPcntg:number = (parseInt(firstRow["PASSED"])/(parseInt(firstRow["FAILED"])+parseInt(firstRow["BROKEN"])+parseInt(firstRow["SKIPPED"])+parseInt(firstRow["PASSED"])))*100;

        const json:any= `{
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    "themeColor": "0076D7",
    "summary": "BOM Test",
    "sections": [{
        "activityTitle": "Automation Test Results",
        "activitySubtitle": "BI/PI Smoke-Regression Test Results",
        "activityImage": "https://raw.githubusercontent.com/Surajbehera2017/Git_Practice/master/protractor.png",
        "facts": [{
            "name": "FAILED TESTCASES:",
            "value": "${firstRow["FAILED"]}"
        },{
            "name": "BROKEN TESTCASES:",
            "value": "${firstRow["BROKEN"]}"
        },{
            "name": "PASSED TESTCASES:",
            "value": "${firstRow["PASSED"]}"
        }, {
            "name": "SKIPPED TESTCASES:",
            "value": "${firstRow["SKIPPED"]}"
        }, {
            "name": "PASS PERCENTAGE:",
            "value": "${passPcntg.toFixed(2)}%"
        }],
        "markdown": true
    }],
    "potentialAction": [{
        "@type": "OpenUri",
        "name": "Open Full Report",
        "targets":[
        {
        "os":"default",
        "uri":"https://dev.azure.com/pdd-ihsmarkit/ElectronicParts/_build?definitionId=2052&_a=summary"
        }]
    }]
    }`;

        const webHook = 'https://infocorp365.webhook.office.com/webhookb2/9ef02628-3dc7-4a4b-bd18-93fe660c8c8e@c1156c2f-a3bb-4fc4-ac07-3eab96da8d10/IncomingWebhook/abdf807387e041fea5ff1531f53ac5f5/37b88d34-5737-4657-af9b-5a1407caa8c6'

        await allureStep(`[API] Send POST to endpoint: "${webHook}" with request body: ${JSON.stringify(json)}
         for user ${JSON.stringify(json)}`, async() => {
            // const cookie  = await this.getCookie(user);
            const response: any = new Promise(async (resolve,reject) =>{
                await unirest.post(webHook)
                    .headers({'Accept': 'application/json', 'Content-Type': 'application/json',
                    })
                    .send(json)
                    .end((response) => {
                        resolve ({
                            status: response.status,
                            headers: response.headers,
                            body:response.body})
                    });
            });
        });

    }

};