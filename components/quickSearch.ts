import {Input} from "./simple/input";
import {commonElements, gridElements, quickSearchElements, searchElements} from "../elements/elements";
import {allureStep} from "../helper/allure/allureSteps";
import {browser, ElementFinder} from "protractor";
import {Button} from "./simple/button";
import {Waiters as w} from "../helper/waiters";
import {CheckBox} from "./simple/checkBox";

const checkbox: CheckBox = new CheckBox();
const button:Button = new Button();
const input: Input = new Input();

export class QuickSearch {

    public async clickOnTheSearchButton() {
      await allureStep('Click on the search button', async () => {
          await button.clickOnTheElement(quickSearchElements.searchButton);
      })
    };

    public async performQuickSearch (searchValue: string) {
        await allureStep('Perfrom quick search with' + searchValue, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.waitForAngularEnabled(false);
            await input.fillFieldWithValue(quickSearchElements.searchField, searchValue);
            await button.clickOnTheElement(quickSearchElements.searchButton);
            // await browser.sleep(1000);
            await w.waitUntilElementIsDisplayed(searchElements.parts.partsSearchForm);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementNotDisplayed(quickSearchElements.loading);
            await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async performQuickSearchWithoutSetCriteria () {
        await allureStep('Perfrom quick search with', async () => {
            //await browser.waitForAngularEnabled(false);
            await w.waitUntilElementIsClickable(quickSearchElements.searchButton);
            await button.clickOnTheElement(quickSearchElements.searchButton);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(searchElements.parts.partsSearchForm);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async performQuickSearchWithWait (searchValue: string, wait: ElementFinder) {
        await allureStep('Perfrom quick search with' + searchValue, async () => {
            await browser.waitForAngularEnabled(false);
            await w.waitUntilElementIsDisplayed(quickSearchElements.searchField);
            await w.waitUntilElementIsClickable(quickSearchElements.searchField);
            await input.fillFieldWithValue(quickSearchElements.searchField, searchValue);
            await button.clickOnTheElement(quickSearchElements.searchButton);
            //temporary
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.sleep(2000);
            await w.waitUntilElementIsDisplayed(wait, false);
            await w.waitUntilWorkingModalNotDisplayed();

        });
    };

    public async openQuickSearchDropdwon() {
        await allureStep('Open quick search dropdwon', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(quickSearchElements.quickSearchDropdown.get(0));
            await w.waitUntilWorkingModalNotDisplayed();
            await button.clickOnTheElement(quickSearchElements.quickSearchDropdown.get(0));
            await w.waitUntilElementIsClickable(quickSearchElements.simpleSearchContainer);
        })
    };

    public async closeQuickSearchDropdwon() {
        await allureStep('Close quick search dropdwon', async () => {
            await button.clickOnTheElement(quickSearchElements.quickSearchDropdown.get(0));
            await w.waitUntilElementNotDisplayed(quickSearchElements.simpleSearchContainer);
        })
    };

    public async checkRadioButtonByLabelName(labelName:string) {
        await allureStep('Check '+ labelName + ' radio button', async () => {
            const labelNames:any = await quickSearchElements.simpleSearchRadioButtonLabels.getText();
            for (let i:number = 0; i < labelNames.length; i++) {
                if(labelNames[i] === labelName) {
                    await quickSearchElements.simpleSearchRadioButtonLabels.get(i).click();
                }
            }
        });
    };

    public async checkKeywordTypeRadioButtonByLabelName(labelName:string) {
        await allureStep('Check '+ labelName + ' radio button', async () => {
            const labelNames:any = await quickSearchElements.simpleSearchRadioButtonLabels.getText();
            for (let i:number = 0; i < labelNames.length; i++) {
                if(labelNames[i] === labelName) {
                    await quickSearchElements.simpleSearchRadioButtonLabels.get(i).click();
                }
            }
        });
    };

    public async openDropdownAndSetAType(radioButtonLabel: string) {
        await allureStep(`Set ${radioButtonLabel} in quick search`, async () => {
            await this.openQuickSearchDropdwon();
            await this.checkRadioButtonByLabelName(radioButtonLabel);
        })

    };

    public async setATypeAndPerformAQuickSearch(radioButtonLabel: string, searchValue:string, waitElement:any) {
        await w.waitUntilWorkingModalNotDisplayed();
        await this.openDropdownAndSetAType(radioButtonLabel);
        await input.fillFieldWithValue(quickSearchElements.searchField, searchValue);
        await button.clickOnTheElement(quickSearchElements.searchButton);
        await w.waitUntilElementIsDisplayed(waitElement);
        await w.waitUntilWorkingModalNotDisplayed();
    };

    public async setATypeIgnoreAndPerformAQuickSearch(radioButtonLabel: string, ignoreStatus: string, searchValue:string, waitElement:any) {
        await this.openDropdownAndSetAType(radioButtonLabel);
        await checkbox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel, quickSearchElements.ignoreSpecCharInput, ignoreStatus)
        await input.fillFieldWithValue(quickSearchElements.searchField, searchValue);
        await button.clickOnTheElement(quickSearchElements.searchButton);
        await w.waitUntilElementNotDisplayed(gridElements.gridSpinner);
        await w.waitUntilElementIsDisplayed(waitElement);

    };

    public async setKeywordTypeAndPerformAQuickSearch(keywordType: string, searchValue:string, waitElement:any) {
        await this.openQuickSearchDropdwon();
        await this.checkRadioButtonByLabelName('Keyword Search');
        await this.checkKeywordTypeRadioButtonByLabelName(keywordType);
        await input.fillFieldWithValue(quickSearchElements.searchField, searchValue);
        await button.clickOnTheElement(quickSearchElements.searchButton);
        await w.waitUntilElementIsDisplayed(waitElement);
    };

    public async waitForTypeAhead() {
        await w.waitUntilElementIsDisplayed(commonElements.lookAhead.get(0))
    };

    public async clickOnX() {
        await allureStep('Click on the X in quick search input', async () => {
            await button.clickOnTheElement(quickSearchElements.quickSearchX);
        })
    }
}