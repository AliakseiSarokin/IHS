import {browser, ElementFinder} from 'protractor';
import {Waiters as w} from "../helper/waiters";
import {Key} from "selenium-webdriver";
import {allureStep} from "../helper/allure/allureSteps";
import {protractor} from "protractor/built/ptor";

export class Actions {

    public async mouseMoveToElement(elem:ElementFinder) {
        await browser.actions().mouseMove(elem).perform();
    };

    public async mouseDownToElement(elem:ElementFinder) {
        await browser.actions().mouseDown(elem).perform();
    };

    public async mouseUp() {
        await browser.actions().mouseUp().perform();
    };

    public static async mouseMoveToElementStatic(elem:ElementFinder) {
        await allureStep (`move mouse over element ${elem.locator()}`, async ()=> {
            await browser.actions().mouseMove(elem).perform();
        });
    };

    public async mouseMoveUp() {
        await browser.actions().mouseMove({x:0,y:-50}).perform();
    };

    public async mouseMoveRight() {
        await browser.actions().mouseMove({x:50,y:0}).perform();
    };

    public async mouseMoveToElementAndWaitForTooltip(element:ElementFinder, tooltip:ElementFinder) {
        await allureStep('move mouse to element and wait for tooltip', async () => {
            await this.mouseMoveToElement(element);
            await w.waitUntilElementIsDisplayed(tooltip);
            await w.waitUntilElementIsClickable(tooltip);
        });
    };

    public static async mouseMoveToElementAndWaitForTooltipStatic(element:ElementFinder, tooltip:ElementFinder) {
        await browser.actions().mouseMove(element).perform();
        await w.waitUntilElementIsDisplayed(tooltip);
        await w.waitUntilElementIsClickable(tooltip);
    };

    public static async click(elemment: ElementFinder)  {
        await allureStep(`Click on the element ${await elemment.locator()}`, async () => {
            await browser.actions().click(elemment).perform();
        });
    };

    public static async doubleClick(elemment: ElementFinder)  {
        await allureStep(`Peform double click ${await elemment.locator()}`, async () => {
            await browser.actions().doubleClick(elemment).perform();
        });
    };

    public static async uncertainClick()  {
        await allureStep(`Uncertain mouse click on a page`, async () => {
            await browser.actions().click().perform();
        });
    };

    public static async sendKeys(element: ElementFinder, value:string)  {
        await allureStep(`Set ${value }value to unput ${await element.locator()}`, async () => {
            await element.clear();
            await element.click();
            await browser.actions().sendKeys(value).perform();
            await element.click();
        });
    };

    public static async sendKeysAndWait(element: ElementFinder, value:string, waitElement: ElementFinder)  {
        await allureStep(`Set ${value }value to unput ${await element.locator()}`, async () => {
            await element.click();
            await browser.actions().sendKeys(value).perform();
            await w.waitUntilElementIsDisplayed(waitElement);
            await w.waitUntilElementIsClickable(waitElement);
        });
    };

    public static async clearInputWithDelete(input:ElementFinder) {
        await allureStep('Clear input with Delete', async() => {
            await this.click(input);
            await browser.actions()
                .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"))
                .sendKeys(protractor.Key.chord(protractor.Key.DELETE))
                .perform();
        });
    };

    public static async copy() {
        await allureStep('Copy string', async() => {
            await browser.actions()
                .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "c"))
                .perform();
        });
    };

    public static async pasteInInput(input:ElementFinder) {
        await allureStep('Paste string in input', async() => {
            await browser.actions().click(input).perform();
            await browser.actions()
                .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "v"))
                .perform();
        });
    };

    public static async copyPaste() {
        await allureStep('Copy paste', async() => {
            await browser.actions()
                .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "c"))
                .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "v"))
                .perform();
        });
    };

    public static async clickOnElementWithControl(elm: any) {
        await allureStep('Copy paste', async() => {
            await browser.actions()
                .mouseMove(elm)
                .keyDown(protractor.Key.CONTROL)
                .click()
                .keyUp(protractor.Key.CONTROL)
                .perform();
        });
    };

    public static async copyValue() {
        await allureStep('Copy', async() => {
            await browser.actions()
                .keyDown(protractor.Key.CONTROL)
                .sendKeys('c')
                .perform();
        });
    };

}