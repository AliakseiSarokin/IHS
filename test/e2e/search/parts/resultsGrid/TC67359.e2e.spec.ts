import {Actions} from "../../../../../utils/actions";
import {Button} from "../../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, fieldStatuses} from "../../../../../testData/global";
import {CheckBox} from "../../../../../components/simple/checkBox";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {Grid} from "../../../../../components/grid";
import {gridElements, quickSearchElements, searchElements} from "../../../../../elements/elements";
import {Login} from "../../../../../components/login";
import {Modal} from "../../../../../components/modal";
import {QuickSearch} from "../../../../../components/quickSearch";
import {quickSearchData} from "../../../../../testData/search";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
import {sortOptions} from "../../../../../testData/columnHheaders";

const button: Button = new Button();
const checkBox: CheckBox = new CheckBox();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const login: Login = new Login();
const modal: Modal = new Modal();
const quickSearch: QuickSearch = new QuickSearch();
const searchLogic: SearchLogic = new SearchLogic();

describe('TC67359 UI: Part number starts with search behavior tweaks', () => {

    it('should be sort item for part search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[0]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel,
            quickSearchElements.ignoreSpecCharInput, fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearchWithWait('1234', gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Part Number', true);
        // next checks is temporarily skipped, because need to make a method to sort the 'Part Number' values

        // const partNumberActualAscCells: string [] = await grid.newGridReturnCellValuesByColumnName(0,
        //     'Part Number');
        // const partNumberExpectAscCells: string[] = await grid.compareAscNumberWithCharactersValues(partNumberActualAscCells.slice());
        // await expect(partNumberExpectAscCells).toEqual(partNumberActualAscCells);
    });

    it('should be sort be sort filter options', async () => {
        await grid.newGridOpenFilterBoxByName('Part Number');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.input, 'value'))
            .toEqual('1234');
        await expect(await gridElements.columnsSort.ignoreSpecCharInput.isSelected()).toBeTruthy()
    });

    it('should perform search through sorting', async () => {
        await grid.peformSearchInColumnSortWithValue('12345', gridElements.grid);
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'value'))
            .toEqual('12345');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual('Part # Starts With');
        const partNumberCells: string [] = await grid.newGridReturnCellValuesByColumnName(0,
            'Part Number');
        await expect(partNumberCells.sort()).toEqual(partNumberCells);
    });

    it('should be sort filter options after search through sort', async () => {
        await grid.newGridOpenFilterBoxByName('Part Number');
        // await expect(await gridElements.columnsSort.activeDropdownOption.getText()).toEqual(sortOptions.searchDroprownOptions[2]);
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.input, 'value'))
            .toEqual('12345');
        await expect(await gridElements.columnsSort.ignoreSpecCharInput.isSelected()).toBeTruthy()
    });

    it('should not be option to search with empty value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy()
    });

    it('should not be option to search with space as value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, ' ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy()
    });

    it('should not be option to search with 1 char enterred value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '1');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy()
    });

    it('should not be option to search with 2 chars enterred value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '12');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy()
    });

    it('should be option to search with 3 chars enterred value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '123');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy()
    });

    it('should perform search with spec chars ', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '145 ~$`\'@%^&()-_={}\\[]:;<>/|"?');
        await checkBox.checkUnCheckSingleCheckbox(gridElements.columnsSort.ignoreSpecCharLabel,
            gridElements.columnsSort.ignoreSpecCharInput, fieldStatuses.emptyField);
        await grid.peformSearchInColumnSort(modal.modalBodyGrid);
    });

    it('should be the same search criteria in advanced parts search', async () => {
        await modal.closeModalIfPresent();
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField, 'value'))
            .toEqual('145 ~$`\'@%^&()-_={}\\[]:;<>/|"?');
        await expect(await searchElements.parts.ignoreSpecCherInput.get(0).isSelected()).toBeFalsy();
        await expect(await searchElements.parts.partsSearchRadioButtonsInputs.get(1).isSelected()).toBeTruthy();
    });
});
