import {ElementFinder} from "protractor";
import {allureStep} from "../../helper/allure/allureSteps";
import {Waiters as w} from "../../helper/waiters";

const path = require('path');

export class Input{

    public async uploadAFile(input:any, pathToFile:string){
        await allureStep('Upload a file' + pathToFile, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            const absolutePath = path.resolve(__dirname,pathToFile);
            await input.sendKeys(absolutePath);
        });
    };

    public async fillFieldWithValue(input:any, value:string){
        await allureStep('Fill field with ' + value, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await input.clear().sendKeys(value);
        });
    };

    public async clearInput(input:ElementFinder){
        await allureStep(`Clear input ${await input.locator()}` , async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await input.clear();
        });
    };

}