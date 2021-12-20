import {allureStep} from "../helper/allure/allureSteps";
import {Button} from "./simple/button";
const button: Button = new Button();
import {Waiters as w} from "../helper/waiters";
import {async} from "q";
import {ElementAttributes} from "../utils/elementAttributes";
const elementAttributes:ElementAttributes = new ElementAttributes();
import {fieldStatuses} from "../testData/global";
import {element, by, browser, ElementFinder, ElementArrayFinder} from "protractor";
import {Link} from "./simple/link";
const link: Link = new Link();
import {Modal} from './modal'
import {sliderElements} from "../elements/elements";
const modal: Modal = new Modal();
export class Slider {

    public static async openSliderByClickingOnTheElement(element:any) {
        await allureStep('Open slider by clicking on the element', async () => {
            await browser.waitForAngular();
            await button.clickOnTheElement(element);
            await w.waitUntilElementIsDisplayed(sliderElements.openSliderBox);
            await w.waitUntilElementIsClickable(sliderElements.openSliderBox);
            await w.waitUntilElementIsDisplayed(sliderElements.sliderTitle);
            await w.waitUntilElementIsClickable(sliderElements.sliderTitle);
            await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
            await browser.sleep(1500);
        });
    };

    public static async openSliderByClickingOnTheButtonName(buttonName:string) {
        await allureStep('Open slider by clicking on the ' + buttonName, async () => {
            await browser.waitForAngular();
            await w.waitUntilElementIsDisplayed(await button.returnButtonByText(buttonName))
            await button.clickByButtonName(buttonName);
            await w.waitUntilElementIsDisplayed(sliderElements.openSliderBox);
            await w.waitUntilElementIsClickable(sliderElements.openSliderBox);
            await w.waitUntilElementIsDisplayed(sliderElements.sliderTitle);
            await w.waitUntilElementIsClickable(sliderElements.sliderTitle);
            await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle)
        });
    };

    public static async openSliderByClickingOnTheLinkName(linkName:string) {
        await allureStep('Open slider by clicking on the ' + linkName, async () => {
            await browser.waitForAngular();
            await link.clickOnTheLinkByName(linkName);
            await w.waitUntilElementIsDisplayed(sliderElements.openSliderBox);
            await w.waitUntilElementIsClickable(sliderElements.openSliderBox);
            await w.waitUntilElementIsDisplayed(sliderElements.sliderTitle);
            await w.waitUntilElementIsClickable(sliderElements.sliderTitle);
        });
    };

    public static async closeSlider(closeElement:ElementFinder, waitElement: ElementFinder) {
        await allureStep('Close slider', async () => {
            await browser.waitForAngularEnabled(false);
            await closeElement.click();
            await w.waitUntilElementNotDisplayed(sliderElements.openSliderBox);
            await w.waitUntilElementIsClickable(waitElement)
        });
    };

    public static async closeSliderWithButtonName(buttonName:string, waitElement: any) {
        await allureStep('Close slider by clicking on the ' + buttonName, async () => {
            await browser.waitForAngular();
            await button.clickByButtonName(buttonName);
            await w.waitUntilElementNotDisplayed(sliderElements.openSliderBox);
            await w.waitUntilElementIsClickable(waitElement)
        });
    };

    public static async switchOnTheLeftNavSectionByClickingOnTheSectionName(menuItemName:string) {
        await allureStep('Click on the '+ menuItemName + ' section and wait for enabled session', async() => {
            const menuItem:any = element(by.cssContainingText('.menu-item', menuItemName));
            await menuItem.click();
            await w.waitUntilElementIsClickable(sliderElements.openSliderBox);
            await w.waitUntilWorkingModalNotDisplayed();
            await expect(elementAttributes.getElementAttribute(menuItem, 'class')).toContain(fieldStatuses.active);
        });
    };
}