import {browser, by} from "protractor";
import {Help} from "../../components/help";
import {helpPanelElements} from "../../elements/elements";
import {Iframe} from "../../components/simple/iframe";
import {Waiters as w} from "../../helper/waiters";
import {allureStep} from "../../helper/allure/allureSteps";

const help: Help = new Help();
const iframe: Iframe = new Iframe();

export class HelpLogic {

    public async openAndCheckHelpPanelTitle(title: string) {
        await help.openHelpPanel();
        await browser.sleep(3000);
        browser.waitForAngularEnabled(false);
        await iframe.switchToIframe(browser.findElement(by.css('#helpIframe')));
        await w.waitUntilElementIsDisplayed(helpPanelElements.helpPanelTitle);
        await w.waitUntilElementIsDisplayed(helpPanelElements.helpPanelParagraph);
        let titleText: string = await helpPanelElements.helpPanelTitle.getText();
        let result: string = titleText.replace(/\s+/g, ' ');
        await expect(result).toEqual(title);
        await iframe.switchToDefaultContent();
        browser.waitForAngularEnabled(false);
        await help.closeHelpPanel()
    }

    public async openAndCheckHelpPanelExpandAllButton() {
        await allureStep('Open Help panel and verify Expand All Button', async () => {
            await browser.sleep(3000);
            await browser.executeScript("document.querySelectorAll('.btn-deemphasized')[2].click()");
            await browser.waitForAngularEnabled(false);
            await iframe.switchToIframe(browser.findElement(by.css('#helpIframe')));
            await w.waitUntilElementIsClickable(helpPanelElements.openedSubitem);
            await expect(helpPanelElements.openedSubitemAll.count()).toBeGreaterThan(1);
            await iframe.switchToDefaultContent();
        });
    }

    public async openAndCheckHelpPanelOpenTopicInNewWindowButton() {
        await allureStep('Open Help panel and verify open topic in new window Button functionality', async () => {
            await browser.sleep(3000);
            let initialWindow:string = await browser.getWindowHandle();
            await browser.executeScript("document.querySelectorAll('.btn-deemphasized')[3].click()");
            await browser.waitForAngularEnabled(false);
            let windows:string[] = await browser.getAllWindowHandles();
            await expect(windows.length).toBeGreaterThan(1);
            for(let i:number=0;i<windows.length;i++){
                if(windows[i]!=initialWindow){
                    await browser.switchTo().window(windows[i]);
                    break;
                }
            }
            await expect(await browser.getCurrentUrl()).toContain('bomhelp/Content/Getting_around_BOM_Manager/Getting_around_BOM_Manager.htm');
            await browser.close();
            await browser.switchTo().window(initialWindow);
        });
    }

    public async checkHelpPanelButtonTooltip(buttonIndex:number,tooltip:string) {
        await allureStep('Open Help panel and verify button tooltip of '+tooltip, async () => {
            await w.waitUntilElementIsDisplayed(helpPanelElements.buttonWithIndex(buttonIndex));
            let buttonTitle: string = await helpPanelElements.buttonWithIndex(buttonIndex).getAttribute('title');
            await expect(buttonTitle).toEqual(tooltip);
        });
    }

    public async openHelpPanelAndCheckOpenedSubitem(subitemName: string) {
        await help.openHelpPanel();
        await browser.waitForAngularEnabled(false);
        await iframe.switchToIframe(browser.findElement(by.css('#helpIframe')));
        await w.waitUntilElementIsDisplayed(helpPanelElements.openedSubitem);
        if(await helpPanelElements.closedSubtitleByName(subitemName).isPresent()) {
            await w.waitUntilElementIsDisplayed(helpPanelElements.openedSubitem);
            await expect(await helpPanelElements.closedSubtitleByName(subitemName).isPresent()).toBeFalsy();
            await iframe.switchToDefaultContent();
            await help.closeHelpPanel();
        } else {
            await w.waitUntilElementIsDisplayed(helpPanelElements.openedSubitem);
            await expect(await helpPanelElements.openedSubitem.getText()).toEqual(subitemName);
            await iframe.switchToDefaultContent();
            await help.closeHelpPanel();
        }
    }

    public async openHelpPanelAndCheckTitleAndOpenedSubitem(title: string, subitemName: string) {
        await help.openHelpPanel();
        browser.waitForAngularEnabled(false);
        await iframe.switchToIframe(browser.findElement(by.css('#helpIframe')));
        await w.waitUntilElementIsDisplayed(helpPanelElements.helpPanelTitle);
        let titleText: string = await helpPanelElements.helpPanelTitle.getText();
        let result: string = titleText.replace(/\s+/g, ' ');
        await expect(result).toEqual(title);
        await w.waitUntilElementIsDisplayed(helpPanelElements.openedSubitem);
        await expect(await helpPanelElements.openedSubitem.getText()).toEqual(subitemName);
        await iframe.switchToDefaultContent();
        await help.closeHelpPanel()
    }

    public async openHelpPanelAndCheckOpenedUnderSubitem(subitemName: string, underSubitemName: string) {
        await help.openHelpPanel();
        browser.waitForAngularEnabled(false);
        await iframe.switchToIframe(browser.findElement(by.css('#helpIframe')));
        await w.waitUntilElementIsDisplayed(helpPanelElements.openedSubitem);
        await expect(await helpPanelElements.openedSubitem.getText()).toEqual(subitemName);
        await expect(await helpPanelElements.openedUnderSubitem.getText()).toEqual(underSubitemName);
        await iframe.switchToDefaultContent();
        await help.closeHelpPanel()
    }

    public async openHelpPanelAndCheckTitleAndRelatedHotSpotLink(title: string, contentText: string) {
        await help.openHelpPanel();
        browser.waitForAngularEnabled(false);
        await iframe.switchToIframe(browser.findElement(by.css('#helpIframe')));
        await w.waitUntilElementIsDisplayed(helpPanelElements.helpPanelTitle);
        let titleText: string = await helpPanelElements.helpPanelTitle.getText();
        let result: string = titleText.replace(/\s+/g, ' ');
        await expect(result).toEqual(title);
        await w.waitUntilElementIsDisplayed(helpPanelElements.relatedHotSpot);
        await w.waitUntilElementIsClickable(helpPanelElements.relatedHotSpot);
        await expect(await helpPanelElements.relatedHotSpot.getText()).toEqual(contentText);
        await iframe.switchToDefaultContent();
        await help.closeHelpPanel()
    }
}
