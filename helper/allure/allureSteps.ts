import {StringArray} from "../../utils/stringArray";
const stringArray = new StringArray();
import {takeScreenShot} from "./reporter";
import {browser, element} from "protractor";
import * as _ from 'lodash';
declare let allure: any;

export async function allureStep (stepDefinition:string, method: any) {
    await allure.createStep(stepDefinition, async () => {
        try {
            await method();
            if(browser.params.takeScreenShotFromEachAllureStep)  {
                await takeScreenShot();
            }
        }
        catch (error) {
            await takeScreenShot();
            throw error;
        }
    })();
}

export async function expectToEqual(method:Function, expectedResult:any) {
    let value:any = await method();
    await allure.createStep(`Compare expected '${expectedResult}' with actual`, async () => {
        if(_.isArray(value)) {
            if(!stringArray.arraysEqual(value, expectedResult)) {
                await takeScreenShot();
                await expect(value).toEqual(expectedResult);
                throw `Expected result '${expectedResult}' does not match with actual '${value}'`
            }
        }
        else if (value !== expectedResult) {
            await takeScreenShot();
            await expect(value).toEqual(expectedResult);
            throw `Expected result '${expectedResult}' does not match with actual '${value}'`
        }
    })();
}

export async function expectToContain(method: () => any[] | string, expectedResult: any[] | string) {
    let value:any = await method();
    await allure.createStep(`Compare expected  '${expectedResult}' with actual on contain`, async () => {
        let doContain = _.isArray(value)
            ? _.difference([].concat(expectedResult), value).length === 0
            : _.includes(value, expectedResult);

        if (!doContain) {
            await takeScreenShot();
            await expect(value).toContain(expectedResult);
            throw `Expected result '${expectedResult}' does not contain '${value}'`
        }
    })();
}

