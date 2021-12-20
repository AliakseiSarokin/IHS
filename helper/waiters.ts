import {browser, ElementFinder, ExpectedConditions} from "protractor";
import {gridElements, modalElements, quickSearchElements} from "../elements/elements";
import {modalTitles} from "../testData/global";
import {EventEmitter} from "selenium-webdriver";

export class Waiters {

    public static async waitUntilElementIsDisplayed(webElement: any, waitForSpinnerDisappearing: boolean = true) {
        if (waitForSpinnerDisappearing) {
            await this.waitUntilWorkingModalNotDisplayed();
        }
        try {
            await browser.wait(ExpectedConditions.visibilityOf(webElement),
                browser.params.waitWebElementMaxTimeout);
        }
        catch (e) {
            if (e) {
                throw `Element ${await webElement.locator()} is not displayed after ${browser.params.waitWebElementMaxTimeout} secs`;
            }
        }
        if (waitForSpinnerDisappearing) {
            await this.waitUntilWorkingModalNotDisplayed();
        }
    };

    public static async waitUntilOneOfTwoElementsIsDisplayed(webElement: any, webElementSecond: any, waitForSpinnerDisappearing: boolean = true) {
        if (waitForSpinnerDisappearing) {
            await this.waitUntilWorkingModalNotDisplayed();
        }
        try {
            await browser.wait(ExpectedConditions.visibilityOf(webElement),
                browser.params.waitWebElementMaxTimeout);
        }
        catch (e) {
                try{
                    await this.waitUntilWorkingModalNotDisplayed();
                    await browser.wait(ExpectedConditions.visibilityOf(webElementSecond),
                        browser.params.waitWebElementMaxTimeout);
                }
                catch (error) {
                    if(error){
                        throw `Element ${await webElement.locator()} is not displayed after ${browser.params.waitWebElementMaxTimeout} secs
                        and element ${await webElementSecond.locator()} is not displayed after ${browser.params.waitWebElementMaxTimeout} secs`;
                    }
                }
        }
        if (waitForSpinnerDisappearing) {
            await this.waitUntilWorkingModalNotDisplayed();
        }
    };

    public static async waitUntilElementNotDisplayed(webElement: any) {
        await this.waitUntilWorkingModalNotDisplayed();
        try {
            await browser.wait(ExpectedConditions.invisibilityOf(webElement),
                browser.params.waitWebElementMaxTimeout);
        }
        catch (e) {
            if (e) {
                throw `Element ${await webElement.locator()} is still displayed after ${browser.params.waitWebElementMaxTimeout} secs`;
            }
        }
        await this.waitUntilWorkingModalNotDisplayed();
    };

    public static async waitUntilWorkingModalNotDisplayed() {
        try {
            //await browser.waitForAngularEnabled(false);
            await browser.wait(ExpectedConditions.invisibilityOf(modalElements.modalTitleByName(modalTitles.working)),
                browser.params.waitWebElementMaxTimeout);
            await browser.wait(ExpectedConditions.invisibilityOf(quickSearchElements.loading),
                browser.params.waitWebElementMaxTimeout);
            await browser.wait(ExpectedConditions.invisibilityOf(gridElements.gridSpinner),
                browser.params.waitWebElementMaxTimeout);
        }
        catch (e) {
            if (e) {
                throw `Spinner modal is not dissapear after ${browser.params.waitWebElementMaxTimeout} secs`;
            }
        }
    };

    public static async waitUntilElementIsClickable(webElement: any) {
        await this.waitUntilWorkingModalNotDisplayed();
        try {
            await browser.wait(ExpectedConditions.elementToBeClickable(webElement),
                browser.params.waitWebElementMaxTimeout);
        }
        catch (e) {
            if (e) {
                throw `Element ${await webElement.locator()} is not clickable after ${browser.params.waitWebElementMaxTimeout} secs`;
            }
        }
        await this.waitUntilWorkingModalNotDisplayed();
    };

    public static async waitUntilElementToBeUnselected(webElement: any) {
        await this.waitUntilWorkingModalNotDisplayed();
        await browser.wait(ExpectedConditions.not(ExpectedConditions.elementToBeSelected(webElement)),
            browser.params.waitWebElementMaxTimeout);
        await this.waitUntilWorkingModalNotDisplayed();
    };


    public static async waitUntilUrlIsContained(url: string) {
        await browser.wait(ExpectedConditions.urlContains(url),
            browser.params.waitWebElementMaxTimeout);
    };

    public static async waitUntilDomIsReady() {
        let domState = await browser.executeScript((): string => {
            return document.readyState
        });
        if (domState !== "complete") {
            await browser.sleep(200);
            await this.waitUntilDomIsReady();
        }
    }
    public static sleep (waitTimeInMs) {
        new Promise(resolve => setTimeout(resolve, waitTimeInMs));
    }

    public static async waitUntilTextToBePresent(webElement: ElementFinder, text: string, timeToWait: number = browser.params.waitWebElementMaxTimeout) {
        await browser.wait(ExpectedConditions.textToBePresentInElement(webElement, text), timeToWait);
    }
}