import {browser, ElementFinder} from "protractor";
import {Button} from "../components/simple/button";
import {Link} from "../components/simple/link";
import {Waiters as w} from "../helper/waiters";
import {allureStep} from "../helper/allure/allureSteps";

const button = new Button();
const link: Link = new Link();

export class NewBrowserTab  {

    async clickOnElementOpenNewBrowserAndCheckUrl(element, matchUrl) {
        await w.waitUntilElementIsDisplayed(element);
        await w.waitUntilElementIsClickable(element);
        await  button.clickOnTheElement(element);
        let browserTabs = await browser.driver.getAllWindowHandles();
        if(browserTabs.length>1) {
            await browser.driver.switchTo().window(browserTabs[1]);
            await browser.manage().timeouts().pageLoadTimeout(50000);
            let url:string = await browser.driver.getCurrentUrl();
            await expect(url).toContain(matchUrl);
            await browser.driver.close();
            await browser.driver.switchTo().window(browserTabs[0]);
        }
    };

    async clickOnElementOpenNewBrowserAndCheckUrlWithWait(element, matchUrl) {
        await w.waitUntilElementIsDisplayed(element);
        await w.waitUntilElementIsClickable(element);
        await  button.clickOnTheElement(element);
        let browserTabs = await browser.driver.getAllWindowHandles();
        if(browserTabs.length>1) {
            await browser.driver.switchTo().window(browserTabs[1]);
            await browser.sleep(7000);
            let url = await browser.getCurrentUrl();
            await expect(url).toContain(matchUrl);
            await browser.driver.close();
            await browser.driver.switchTo().window(browserTabs[0]);
        }
    };

    async openNewBrowserTabByLinkTextAndIndex(linkText:string, index:number=0) {
        await allureStep('Open new browser tab by link text and link index: ' + linkText + ', index= ' + index,
            async () => {
            await link.clickOnTheLinksByNameAndIndex(linkText, index);
            const browserTabs = await browser.driver.getAllWindowHandles();
            await browser.waitForAngularEnabled(false);
            await browser.driver.switchTo().window(browserTabs[1]);
            expect(await browserTabs.length).toEqual(2);
        });
    };

    async closeCurrentBrowserTab() {
        await allureStep('Close active browser tab',async () => {
            const browserTabs = await browser.driver.getAllWindowHandles();
            await browser.driver.close();
            await browser.driver.switchTo().window(browserTabs[0]);
            await browser.waitForAngularEnabled(false);
            const browserTabsCurrent = await browser.driver.getAllWindowHandles();
            expect(await browserTabsCurrent.length).toEqual(browserTabs.length - 1);
        });
    };

};
