import {Waiters as w} from "../helper/waiters";
import {element, by, browser, ElementFinder} from "protractor";
import {allureStep} from "../helper/allure/allureSteps";
import {commonElements, dropdownElements, gridElements} from "../elements/elements";

export class Dropdown {

    public static async openDropdownByClickOnElement(clickElement:ElementFinder, option = '' ) {
        await allureStep('Open dropdown', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(clickElement);
            await clickElement.click();
            await w.waitUntilElementIsDisplayed(dropdownElements.openDropdown);
            await w.waitUntilElementIsClickable(dropdownElements.openDropdown);
            if(Boolean(option)) {
                await w.waitUntilElementIsClickable(option);
            }
        })
    };

    public static async openDropdownByClickOnElementInSortBox(clickElement:ElementFinder) {
        await allureStep('Open dropdown', async () => {
            await clickElement.click();
            await w.waitUntilElementIsDisplayed(dropdownElements.openDropdownSortBox);
            await w.waitUntilElementIsClickable(dropdownElements.openDropdownSortBox);
        })
    };

    public static async closeDropdownByClickOnElement(clickElelent:any) {
        await allureStep('Close dropdown', async () => {
            await clickElelent.click();
            await w.waitUntilElementNotDisplayed(dropdownElements.openDropdown);
        })
    };

    public static async selectValueInDropDownByNumber(number:number) {
        await dropdownElements.dropdownValues.get(number).click();
    };

    public static async selectValueInDropdownByValueNameWithoutWait(valueName: string) {
        await allureStep('Select '+ valueName + 'dropdown value', async () => {
            const value:ElementFinder =await element(by.cssContainingText('.open .pl-select-item>a', valueName));
            await w.waitUntilElementIsDisplayed(value);
            await w.waitUntilElementIsClickable(value);
            await w.waitUntilElementIsClickable(value);
            await value.click();
        })
    };

    public static async getValueInDropdown() : Promise<string[]>{
        let dropdownValues:string[]=[];
        await allureStep('Return value in dropdown', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(gridElements.dropDownItemNames.get(0));
            dropdownValues = await gridElements.dropDownItemNames.getText();
        });
        return dropdownValues;
    };

    public static async selectValueInDropdownByValueNameAndWaitForItem(valueName: string, itemName: string) {
        await allureStep('Select '+ valueName + 'dropdown value and wait for ' + itemName + ' item', async () => {
            const value:ElementFinder = element(by.cssContainingText('.open .pl-select-item>a', valueName));
            await w.waitUntilElementIsDisplayed(value);
            await w.waitUntilElementIsClickable(value);
            await value.click();
            await w.waitUntilElementIsDisplayed(await element(by.cssContainingText('.list-group-item', itemName)));
            await w.waitUntilElementIsClickable(await element(by.cssContainingText('.list-group-item', itemName)));
        })
    };

    public static async selectValueInDropdownByValueName(valueName: string, waitElement: ElementFinder =gridElements.gridWrapper ) {
        await allureStep('Select '+ valueName + 'dropdown value', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.waitForAngularEnabled(false);
            const value:ElementFinder = await element(by.cssContainingText('.pl-select-item>a', valueName));
            await w.waitUntilElementIsDisplayed(value);
            await w.waitUntilElementIsClickable(value);
            await value.click();
            await browser.sleep(1000);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(waitElement);
            await browser.sleep(300);
            await w.waitUntilElementIsClickable(waitElement);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(waitElement);
        })
    }


}