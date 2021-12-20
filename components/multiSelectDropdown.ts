import {allureStep} from "../helper/allure/allureSteps";
import {element, by, browser} from "protractor";
import {gridElements, partDetailsElements} from "../elements/elements";
import {buttonNames, fieldStatuses} from "../testData/global";
import {Button} from "./simple/button";
import {CheckBox} from "./simple/checkBox";
import {Toolbar} from "./toolbar";
import {ViewAlternatesLogic} from "../bussinesLayer/partDetails/viewAlternatesLogic";
import {Waiters as w} from "../helper/waiters";

const button:Button = new Button();
const checkbox = new CheckBox();
const toolbar: Toolbar = new Toolbar();
const viewAlternatesLogic = new ViewAlternatesLogic();

export class MultiSelectDropdown {

    public async applyFilterButtonCheckingViewAlternates() {
        await viewAlternatesLogic.openFilterDropdown();
        await checkbox.checkUnCheckCheckboxes(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
            fieldStatuses.fillField);
        await expect(button.returnButtonByText(buttonNames.apply).isEnabled()).toBeTruthy();
        await checkbox.checkUnCheckCheckboxes(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput, fieldStatuses.emptyField);
        await expect(button.returnButtonByText(buttonNames.apply).isEnabled()).toBeTruthy();
        await checkbox.checkUnCheckCheckboxRange(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
            fieldStatuses.fillField,1,2,);
        await expect(button.returnButtonByText(buttonNames.apply).isEnabled()).toBeTruthy();
        await viewAlternatesLogic.closeFilterDropdownByClickOnElement();
    };

    public async openMultiSelectDropdownByName(buttonName: string){
        await allureStep('Open Multiselect Dropdown by' + buttonName, async () => {
            await w.waitUntilElementIsClickable(element(by.cssContainingText('.cb-btn', buttonName)));
            await element(by.cssContainingText('.cb-btn', buttonName)).click();
            await w.waitUntilElementIsClickable(partDetailsElements.openViewAltDropdown);
        })
    };

    public async closeMultiSelectDropdownByName(buttonName: string){
        await allureStep('Close Multiselect Dropdown by' + buttonName, async () => {
            await element(by.cssContainingText('.cb-btn', buttonName)).click();
            await w.waitUntilElementNotDisplayed(partDetailsElements.openViewAltDropdown);
        })
    };

    public async applyButtonChecking(){
        await checkbox.checkUnCheckCheckboxes(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
            fieldStatuses.emptyField);
        await expect(button.returnButtonByText(buttonNames.apply).isEnabled()).toBeFalsy();
        await checkbox.checkUnCheckCheckboxRange(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
            fieldStatuses.fillField,1,2);
        await expect(button.returnButtonByText(buttonNames.apply).isEnabled()).toBeTruthy();
        await checkbox.checkUnCheckCheckboxRange(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
            fieldStatuses.fillField,1,2);
        await expect(button.returnButtonByText(buttonNames.apply).isEnabled()).toBeFalsy();
        await checkbox.checkUnCheckCheckboxes(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
            fieldStatuses.fillField);
        await expect(button.returnButtonByText(buttonNames.apply).isEnabled()).toBeTruthy();
    };


    private async _arrayWithTheSameValue(cells: any, matchValue:string) {
        let result = await cells.count();
        for (let i = 0, length = result; i < length; i += 1) {
            await expect(await cells.get(i).getText()).toEqual(matchValue);
        }
    };

    public async singleSelection(filterButtonName:string, cells){
        await checkbox.checkUnCheckCheckboxRange(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
            fieldStatuses.fillField,0,4);
        await checkbox.checkUnCheckCheckboxRange(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
            fieldStatuses.fillField,0,1);
        let selectedValue: string = await partDetailsElements.filterCheckboxLabel.get(0).getText();
        if(selectedValue === 'End of Life Notice') {
            return selectedValue
        }
        await button.clickByButtonName(buttonNames.apply);
        await w.waitUntilElementIsDisplayed(gridElements.newGridCheckboxSelectorByIndex(0));
        await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelectorByIndex(0));
        let filterName:string[] = filterButtonName.split(' ');
        await expect(await toolbar.tagLabel.getText()).toEqual([filterName[2] + ': '+ selectedValue]);
        let value = await gridElements.newGridCheckboxSelectorByIndex(0).isPresent();
        if (!value) {
            await this._arrayWithTheSameValue(cells, selectedValue)
        }
    };

    public async multipleFilterChecking(filterButtonName: string) {
        await allureStep(`Check multiple filter ${filterButtonName}`, async () => {
            await w.waitUntilElementIsDisplayed(partDetailsElements.filterCheckboxLabel.get(0));
            await checkbox.checkUnCheckCheckboxRange(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
                fieldStatuses.fillField,0,1);
            await checkbox.checkUnCheckCheckboxRange(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
                fieldStatuses.fillField,0,2);
            const selectedValue: string = await partDetailsElements.filterCheckboxLabel.get(0).getText();
            const selectedValue1: string = await partDetailsElements.filterCheckboxLabel.get(1).getText();
            await button.clickByButtonName(buttonNames.apply);
            await w.waitUntilElementIsDisplayed(gridElements.grid);
            let filterName:string[] = filterButtonName.split(' ');
            await expect(await toolbar.tagLabel.getText()).toEqual([filterName[2] + ': '+ selectedValue,
                filterName[2] + ': '+ selectedValue1]);
        })

    };
}