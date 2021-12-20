import {ElementAttributes} from "../utils/elementAttributes";
const elementAttributes:ElementAttributes = new ElementAttributes();
import {Waiters as w} from "../helper/waiters";
import {Button} from "./simple/button";
import {allureStep} from "../helper/allure/allureSteps";
const button:Button = new Button();
import {browser, element, by} from "protractor";
import {commonElements} from "../elements/elements";
import {buttonNames} from "../testData/global";

export class MultiSelect {

    multiselectToggle: any;
    multiSelectOptionLabels:any;
    multiSelectOptionInputs:any;
    selectAllLabel:any;
    selectAllInput:any;
    multiSelectRow:any;
    multiSelectRowWithSelectedOptions:any;

    constructor() {
        this.multiselectToggle = element.all(by.css('.multiselect-popover'));
        this.multiSelectOptionLabels = element.all(by.css('.ihs-popover>div:not(.popover-title) .checkbox label'));
        this.multiSelectOptionInputs = element.all(by.css('.ihs-popover>div:not(.popover-title) .checkbox input'));
        // this.multiSelectOptionInputs = element.all(by.css('.input-group-btn .popover-content .checkbox'));
        this.selectAllLabel = element(by.css('.popover-title .checkbox label'));
        this.selectAllInput = element(by.css('#checkall'));
        this.multiSelectRow = element.all(by.css('.multiselect-placeholder'));
        this.multiSelectRowWithSelectedOptions = element.all(by.css('.selected-items-wrapper>.selected-item>.item-content'));
    };

    async openMultiSelect(option) {
        await allureStep('Open multiselect', async () => {
            await browser.executeScript("document.querySelectorAll('.multiselect-popover')["+option+"].scrollIntoView()");
            await button.clickOnTheElement(this.multiselectToggle.get(option));
            await w.waitUntilElementIsDisplayed(this.multiSelectOptionLabels.get(0));
            await w.waitUntilElementIsClickable(this.multiSelectOptionLabels.get(0));
        });
    };

    public async selectUnSelectAllChecking() {
        await button.clickOnTheElement(this.selectAllLabel);
        let optionAmount = await this.multiSelectOptionInputs.count();
        for(let i = 0; i < optionAmount; i++) {
            await expect(await elementAttributes.getElementAttribute(this.multiSelectOptionInputs.get(i), 'checked'))
                .toEqual('true');
        }
        await button.clickOnTheElement(this.selectAllLabel);
        for(let i = 0; i < optionAmount; i++) {
            await expect(await elementAttributes.getElementAttribute(this.multiSelectOptionInputs.get(i), 'checked'))
                .toEqual(null);
        }
    };

    async selectMultiSelectOptionAndDisplayInRow (clickButton = buttonNames.apply) {
        //await browser.executeScript("document.querySelectorAll('.popover-content .popover-content label')[0].scrollIntoView()");
        let selectedValues =[];
        let optionAmount = await this.multiSelectOptionInputs.count();
        for(let i = 0; i < 3; i++) {
            await button.clickOnTheElement(this.multiSelectOptionLabels.get(i));
            await w.waitUntilElementIsClickable(this.multiSelectOptionInputs.get(i));
            await expect(await elementAttributes.getElementAttribute(this.multiSelectOptionInputs.get(i), 'checked'))
                .toEqual('true');
            selectedValues[i] = await this.multiSelectOptionLabels.get(i).getText();
        }
        await button.clickByButtonName(clickButton);
        await w.waitUntilElementNotDisplayed(commonElements.popoverContent.first());
        await expect(await this.multiSelectRowWithSelectedOptions.getText()).toEqual(selectedValues);
    };

    async deselectChecking(option, clickButton = buttonNames.apply) {
        await allureStep(`Checking deselect option in multiselect component`, async () => {
            await this.openMultiSelect(option);
            for(let i = 0; i < 3; i++) {
                await button.clickOnTheElement(await this.multiSelectOptionLabels.get(i));
            }
            await button.clickByButtonName(clickButton);
            await w.waitUntilElementNotDisplayed(commonElements.popoverContent.first());
            await expect(this.multiSelectRow.get(option).getText()).toContain('Please select')
            await expect(this.multiSelectRow.get(option).getText()).toContain('Please select a')
        });
    };

    async deselectCheckingPartsSearch(option, clickButton = buttonNames.apply) {
        await allureStep(`Checking deselect option in multiselect component`, async () => {
            await this.openMultiSelect(option);
            for(let i = 0; i < 3; i++) {
                await button.clickOnTheElement(await this.multiSelectOptionLabels.get(i));
            }
            await button.clickByButtonName(clickButton);
            await w.waitUntilElementNotDisplayed(commonElements.popoverContent.first());
            await expect(this.multiSelectRow.get(option).getText()).toEqual('Select value...')
        });
    };


}