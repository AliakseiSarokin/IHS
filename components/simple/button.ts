import {browser, by, element, ElementFinder} from "protractor";
import {allureStep} from "../../helper/allure/allureSteps";
import {Waiters as w} from "../../helper/waiters";

export class Button {


    public returnButtonByText(buttonText: string) {
        return element(by.buttonText(buttonText))
    };


    public returnButtonByTextInModal(buttonText: string) {
        return element(by.css('.modal-body')).element(by.buttonText(buttonText))
    };

    public returnButtonByTextInSlider(buttonText: string) {
        return element(by.css('.slider-panel.open')).element(by.buttonText(buttonText))
    };

    public returnElementByButtonTextAndIndex(buttonText: string, index: number) {
        return element.all(by.buttonText(buttonText)).get(index)
    };

    public returnDisabledButtonByText(buttonText: string) {
        return element(by.xpath(`//button[text()=' ${buttonText} '][@disabled]`))
    };

    public async clickByButtonName(buttonText: string) {
        await allureStep('Click on the ' + buttonText + ' button', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.returnButtonByText(buttonText).click();
        });
    };

    public async clickByButtonNameAndWait(buttonText: string, waitElement: ElementFinder) {
        await allureStep('Click on the ' + buttonText + ' button', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.returnButtonByText(buttonText).click();
            await w.waitUntilElementIsDisplayed(waitElement);
        });
    };

    public async clickByButtonNameInSlider(buttonText: string) {
        await allureStep('Click on the ' + buttonText + ' button', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.returnButtonByTextInSlider(buttonText).click();
        });
    };

    public async clickButtonWithJS(cssLocator: any, waitElement: any) {
        await allureStep(`Click on the element with JS executor - ${cssLocator} locator`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.executeScript(`document.querySelector('${cssLocator}').click()`);
            await w.waitUntilElementIsDisplayed(waitElement);
        });

    };

    public async clickOnTheElement(element: ElementFinder) {
        await allureStep(`Click on the element ${await element.locator()}`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await element.click();
        });
    }

    public async clickOnTheElementAndWait(element: ElementFinder, waitElement: ElementFinder) {
        await allureStep(`Click on the element ${await element.locator()}`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await element.click();
            await w.waitUntilElementIsDisplayed(waitElement);
        });
    };

    public async clickOnTheElementAndWaitNotDisplayed(element:ElementFinder, waitElement: ElementFinder) {
        await allureStep(`Click on the element ${await element.locator()}`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await element.click();
            await w.waitUntilElementNotDisplayed(waitElement);
        });
    }
}