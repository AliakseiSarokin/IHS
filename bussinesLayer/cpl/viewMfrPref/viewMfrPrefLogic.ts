import {browser} from "protractor";
import {gridElements, shadeElements} from "../../../elements/elements";
import {viewMfrPref} from "../../../elements/elements";
import {viewMfrPrefData} from "../../../testData/cpl";
import {Button} from "../../../components/simple/button";
import {ElementAttributes} from "../../../utils/elementAttributes";
import {Grid} from "../../../components/grid";
import {Input} from "../../../components/simple/input";
import {Modal} from "../../../components/modal";
import {Toolbar} from "../../../components/toolbar";
import {TypeAhead} from "../../../components/typeAhead";
import {buttonNames, columnHeaders} from "../../../testData/global";
import {Waiters as w} from "../../../helper/waiters";
import {Actions} from "../../../utils/actions";
import {Dropdown} from "../../../components/dropdown";

const button: Button = new Button();
const grid: Grid = new Grid();
const input: Input = new Input();
const elementAttributes: ElementAttributes = new ElementAttributes();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const typeAhead: TypeAhead = new TypeAhead();


export class ViewMfrPrefLogic {

    public async commentsFieldChecking () {
        await expect(await viewMfrPref.mfrPref.commentsField.isPresent()).toBe(true);
        await input.fillFieldWithValue(viewMfrPref.mfrPref.commentsField,'55555');
        await expect(await viewMfrPref.mfrPref.commentFieldCounter.last().getText()).toEqual('Characters remaining 95 of 100');
    };

    async optionToSelectRadioButtons () {
        let result = await viewMfrPref.mfrPref.shadeRadioButtonsInput.count();
        for(let i=0; i<result;i+=1) {
            await viewMfrPref.mfrPref.shadeRadioButtonsLabel.get(i).click();
            await expect( await elementAttributes.getElementAttribute(viewMfrPref.mfrPref.shadeRadioButtonsInput.get(i),
                'checked'))
               .toEqual('true');
        }
    };

    public async addNewMfr () {
        await browser.waitForAngularEnabled(false);
        await input.fillFieldWithValue(viewMfrPref.mfrPref.mfrNameField, viewMfrPrefData.viewMfrPref.mfrNameForTesting);
        await button.clickButtonWithJS('.shade-footer>button:nth-child(2)', gridElements.grid);
        await w.waitUntilElementNotDisplayed(shadeElements.openedShade);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await toolbar.removeWithClearAll();
        await grid.newGridOpenFilterBoxByName('Imported Manufacturer Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, viewMfrPrefData.viewMfrPref.mfrNameForTesting);
        await grid.peformSearchInColumnSort(await gridElements.newGridRows.get(0));
        await expect(await viewMfrPref.mfrPref.newAddedMfr(viewMfrPrefData.viewMfrPref.mfrNameForTesting).isPresent())
            .toBeTruthy()
    };

    public  async modifyMfr() {
        await button.clickButtonWithJS('button.shim-left-sm', gridElements.grid);
        await w.waitUntilElementNotDisplayed(shadeElements.openedShade);
    }

    public async openDeleteModal () {
        await grid.newGridOpenFilterBoxByName('Imported Manufacturer Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, viewMfrPrefData.viewMfrPref.mfrNameForTesting);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.checkCheckboxRangeNewGrid(0,1);
        await modal.openModalWithButtonByName(buttonNames.delete);
      };

    public async deleteMfrPref(){
        await modal.closeModalWithButton(buttonNames.yesDeleteSelectedItems);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await browser.sleep(2000);
        await expect(await viewMfrPref.mfrPref.newAddedMfr(viewMfrPrefData.viewMfrPref.mfrNameForTesting).isPresent())
            .toBeFalsy()
    };

    async searchForMatchButtonChecking () {
        await grid.checkCheckboxRangeNewGrid(1,2);
        await expect(button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
        await grid.checkCheckboxRangeNewGrid(2,3);
        await expect(button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeFalsy();
        await grid.checkCheckboxRangeNewGrid(2,3);
        await expect(button.returnButtonByText(buttonNames.searchForMatch).isEnabled()).toBeTruthy();
    };

    async shadeChecking () {
        await expect(await elementAttributes.getElementAttribute(viewMfrPref.mfrPref.shadeTypeAhead, 'placeholder'))
            .toEqual('Enter manufacturer name (type ahead)');
        await typeAhead.typeAheadChecking(viewMfrPref.mfrPref.shadeTypeAhead, '1');
        await w.waitUntilElementIsClickable(viewMfrPref.mfrPref.searchForMatchCell.get(0));
    };

    async highlightAfterSearchChecking () {
        await w.waitUntilElementIsDisplayed(shadeElements.shadeSaveButton);
        await button.clickOnTheElementAndWait(shadeElements.shadeSaveButton, gridElements.grid);
        await w.waitUntilElementNotDisplayed(shadeElements.openedShade);
        let result = await gridElements.gridUnlockFirstRowsCells.count();
        for(let i=0;i<await result;i+=1){
            await expect(await gridElements.gridUnlockFirstRowsCells.get(i).getAttribute('class')).toContain('accepted');
        };
    };
}