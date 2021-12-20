import {Actions} from "../../../../../../utils/actions";
import {Button} from "../../../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, fieldStatuses} from "../../../../../../testData/global";
import {CheckBox} from "../../../../../../components/simple/checkBox";
import {Dropdown} from "../../../../../../components/dropdown";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {Grid} from "../../../../../../components/grid";
import {Login} from "../../../../../../components/login";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {gridElements, quickSearchElements, searchElements} from "../../../../../../elements/elements";
import {quickSearchData} from "../../../../../../testData/search";
import {SearchLogic} from "../../../../../../bussinesLayer/search/searchLogic";
import {sortOptions} from "../../../../../../testData/columnHheaders";

const button: Button = new Button();
const checkBox: CheckBox = new CheckBox();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const login: Login = new Login();
const quickSearch: QuickSearch = new QuickSearch();
const searchLogic: SearchLogic = new SearchLogic();

describe('TC67372 UI: Part number Equal search behavior tweaks', () => {

    it('should perform equals search from column sort', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[0]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel, quickSearchElements.ignoreSpecCharInput,
            fieldStatuses.fillField);
        await quickSearch.performQuickSearchWithWait('33-33', gridElements.grid);
        await grid.newGridOpenFilterBoxByName('Part Number');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(sortOptions.searchDroprownOptions[1]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Part Number', true);
        // next checks is temporarily skipped, because need to make a method to sort the 'Part Number' values

        // const partNumberActualAscCells: string [] = await grid.newGridReturnCellValuesByColumnName(0,
        //     'Part Number');
        // const partNumberExpectAscCells: string[] = await grid.compareAscNumberWithCharactersValues(partNumberActualAscCells.slice());
        // await expect(partNumberExpectAscCells).toEqual(partNumberActualAscCells);
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'value'))
            .toEqual('33-33');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual(quickSearchData.typeLabels[2]);
    });

    it('should be equals search attributes in column sort', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Part Number', true);
        await grid.newGridOpenFilterBoxByName('Part Number');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.dropdownInput, 'value'))
            .toEqual('Exact');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.input, 'value'))
            .toEqual('33-33');
        await expect(await gridElements.columnsSort.ignoreSpecCharInput.isDisplayed()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should be validation for sort input', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy()
    });

    it('should not be option to search with space as value', async () => {
        await Actions.sendKeys(gridElements.columnsSort.input, ' ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy()
    });

    it('should be option to search with 1 enterred value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '1');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy()
    });

    it('should perfrom search from sort with unchecked Ignore Spec Chars', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '111-10');
        await checkBox.checkUnCheckSingleCheckbox(gridElements.columnsSort.ignoreSpecCharLabel,
            gridElements.columnsSort.ignoreSpecCharInput, fieldStatuses.emptyField);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Part Number', true);
        // next checks is temporarily skipped, because need to make a method to sort the 'Part Number' values

        // const partNumberActualAscCells: string [] = await grid.newGridReturnCellValuesByColumnName(0,
        //     'Part Number');
        // const partNumberExpectAscCells: string[] = await grid.compareAscNumberWithCharactersValues(partNumberActualAscCells.slice());
        // await expect(partNumberExpectAscCells).toEqual(partNumberActualAscCells);
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'value'))
            .toEqual('111-10');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual(quickSearchData.typeLabels[2]);
    });

    it('should be the same search criteria in advanced parts search', async () => {
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField, 'value'))
            .toEqual('111-10');
        await expect(await searchElements.parts.ignoreSpecCherInput.get(0).isSelected()).toBeFalsy();
        await expect(await searchElements.parts.partsSearchRadioButtonsInputs.get(0).isSelected()).toBeTruthy();
    });
});
