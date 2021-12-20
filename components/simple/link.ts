import {browser, by, element, ElementFinder} from "protractor";
import {Waiters as w} from "../../helper/waiters";
import {allureStep} from "../../helper/allure/allureSteps";

export class Link {

    public returnElementByLinkName(linkName: string) {
        return element(by.linkText(linkName))
    };

    public returnElementByLinkNameAndIndex(linkName: string, index: number) {
        return element.all(by.linkText(linkName)).get(index)
    };

    public returnElementByPartialLinkNameAndIndex(linkName: string, index: number) {
        return element.all(by.partialLinkText(linkName)).get(index)
    };

    public async clickOnTheLinkByName(linkName: string) {
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(element(by.linkText(linkName)));
        await element(by.linkText(linkName)).click();
    };

    public async clickOnTheLinkByNameByRow(linkName: string, row: number, lockedunlocked: number ) {
        await allureStep(`click on the ${linkName} with specifying ${row}`, async ()=> {
        await w.waitUntilWorkingModalNotDisplayed();
        await element.all(by.css(`[row-index="${row}"]`)).get(lockedunlocked).element(by.linkText(linkName)).click();
        });
    };

    public async clickOnTheLinkByNameInSlider(linkName: string) {
        await w.waitUntilWorkingModalNotDisplayed();
        await element(by.css('.slider-panel.open')).element(by.linkText(linkName)).click();
    };

    public async clickOnTheLinksByNameAndIndex(linkName: string, index: number) {
        await w.waitUntilWorkingModalNotDisplayed();
        await element.all(by.linkText(linkName)).get(index).click();
    };

    public async clickOnTheLinkByNameAndWaitForElement(linkName: string, waitElement: ElementFinder) {
        await allureStep('Click on the ' + linkName + 'link and wait for element', async () => {
            await browser.waitForAngularEnabled(false);
            await w.waitUntilWorkingModalNotDisplayed();
            await this.clickOnTheLinkByName(linkName);
            await w.waitUntilElementIsDisplayed(waitElement);
            await w.waitUntilElementIsDisplayed(waitElement);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(waitElement);
        });
    };

    public async clickOnTheLinkByNameAndWaitForElementAdmin(linkName: string, waitElement: ElementFinder) {
        await allureStep('Click on the ' + linkName + 'link and wait for element', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.clickOnTheLinkByName(linkName);
            await w.waitUntilElementIsDisplayed(waitElement);
            await w.waitUntilElementIsClickable(waitElement);
        });
    };


}