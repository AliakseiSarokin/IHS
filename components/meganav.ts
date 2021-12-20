import {by, element} from "protractor";
import {Link} from "./simple/link";
import {Waiters as w} from "../helper/waiters";
import {allureStep} from "../helper/allure/allureSteps";
import {browser} from "protractor";

const link = new Link();

export class Meganav {

    meganavItems: any;
    meganavSubItems: any;
    meganavSubMenu: any;

    constructor () {
        this.meganavItems = element.all(by.css('.mega-nav-menu a'));
        this.meganavSubItems = element.all(by.css('.sub-menu-items-block a'));
        this.meganavSubMenu = element(by.css('.meganav-submenu-content'));
    }

    public async clickOnTheMeganavItemByName(meganav:string) {
        await allureStep('Click on '+ meganav + ' item', async () => {
            await link.clickOnTheLinkByName(meganav);
        });
    };

    public async clickOnTheMeganavSubLinkByName(subLinkName:string) {
        await allureStep('Click on '+ subLinkName + ' sub item', async () => {
            await link.clickOnTheLinkByName(subLinkName);
        });
    };

    public async goToFeatureWithMeganav(meganav:string,waitElement: any) {
        await browser.waitForAngularEnabled(false);
        await this.clickOnTheMeganavItemByName(meganav);
        await w.waitUntilElementIsDisplayed(waitElement);
        await w.waitUntilElementIsClickable(waitElement);
    };

    public async goToFeatureWithMeganavSubLinks(meganav:string, subLinkName:string, waitElement: any) {
        await allureStep('go to feature with meganav SubLinks', async () => {
            await browser.waitForAngularEnabled(false);
            await w.waitUntilElementIsClickable(link.returnElementByLinkName(meganav));
            await this.clickOnTheMeganavItemByName(meganav);
            await w.waitUntilElementIsClickable(link.returnElementByLinkName(subLinkName));
            await this.clickOnTheMeganavSubLinkByName(subLinkName);
            await w.waitUntilElementIsDisplayed(waitElement);
            //await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckbox);
        });
    };

}
