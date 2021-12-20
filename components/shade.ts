import {allureStep} from "../helper/allure/allureSteps";
import {Button} from "./simple/button";
import {element, by, browser} from "protractor";
import {Link} from "./simple/link";
import {Waiters as w} from "../helper/waiters";
import {shadeElements} from "../elements/elements";
import {JsScripts} from "../utils/jsScripts";

const button: Button = new Button;
const link: Link = new Link();
export class Shade {

    public static async openShadeWithButton (buttonName:string) {
        await allureStep('Open shade by clicking on the ' + buttonName, async () => {
            await w.waitUntilElementIsClickable(button.returnButtonByText(buttonName));
            await button.clickByButtonName(buttonName);
            await browser.waitForAngularEnabled(false);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(shadeElements.openedShade);
            await w.waitUntilElementIsClickable(shadeElements.openedShade);
            await browser.sleep(2000);
            await w.waitUntilWorkingModalNotDisplayed();
        });

    };

    public static async openShadeWithLink (linkName:string) {
        await allureStep('Open shade by clicking on the ' + linkName, async () => {
            await link.clickOnTheLinkByName(linkName);
            await browser.waitForAngularEnabled(false);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(shadeElements.openedShade);
            await w.waitUntilElementIsClickable(shadeElements.openedShade);
            await browser.sleep(2000);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public static async openShadeWithLinkByRow (linkName:string) {
        await allureStep('Open shade by clicking on the ' + linkName, async () => {
            await link.clickOnTheLinkByNameByRow(linkName, 0, 1);
            await browser.waitForAngularEnabled(false);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(shadeElements.openedShade);
            await w.waitUntilElementIsClickable(shadeElements.openedShade);
            await browser.sleep(2000);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public static async closeShadeWithButton(buttonName: string, waitElem:any = false) {
        await allureStep('Close shade by clicking on the' + buttonName, async () => {
            await w.waitUntilElementIsClickable(await button.returnButtonByText(buttonName));
            await button.clickByButtonName(buttonName);
            await browser.waitForAngularEnabled(false);
            await w.waitUntilElementNotDisplayed(shadeElements.openedShade);
            await browser.sleep(1500);
            if(Boolean(waitElem)) {
                await w.waitUntilElementIsClickable(waitElem)
            }
            await browser.sleep(1500);
            await w.waitUntilWorkingModalNotDisplayed();
        });

    }

    public static async closeShadeWithElement(element: any) {
        await allureStep('Close shade', async () => {
            await w.waitUntilElementIsDisplayed(element);
            await w.waitUntilElementIsClickable(element);
            await button.clickOnTheElement(element);
            await browser.waitForAngular();
            await w.waitUntilElementNotDisplayed(shadeElements.openedShade);
            await browser.sleep(2000);
            await w.waitUntilWorkingModalNotDisplayed();
        });

    }

    public static async closeShadeWithJsByCssAndNumber(css: string, num:number) {
        await allureStep('Close shade', async () => {
            await JsScripts.clickByCssAndNumber(css, num);
            await w.waitUntilElementNotDisplayed(shadeElements.openedShade);
            await browser.sleep(1500);
        });

    }

}