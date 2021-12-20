import {Actions} from "../../../../../../utils/actions";
import {Button} from "../../../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, fieldStatuses} from "../../../../../../testData/global";
import {CheckBox} from "../../../../../../components/simple/checkBox";
import {Dropdown} from "../../../../../../components/dropdown";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {Grid} from "../../../../../../components/grid";
import {gridElements, quickSearchElements, searchElements} from "../../../../../../elements/elements";
import {quickSearchData} from "../../../../../../testData/search";
import {Login} from "../../../../../../components/login";
import {Modal} from "../../../../../../components/modal";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {SearchLogic} from "../../../../../../bussinesLayer/search/searchLogic";

const button: Button = new Button();
const checkBox: CheckBox = new CheckBox();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const login: Login = new Login();
const modal: Modal = new Modal();
const quickSearch: QuickSearch = new QuickSearch();
const searchLogic: SearchLogic = new SearchLogic();

describe('TC67371 UI: Part number Contain search behavior tweaks', () => {

    it('should be sort item for part search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[0]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel,
            quickSearchElements.ignoreSpecCharInput, fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearchWithWait('lm315', gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Part Number', true);
        // next checks is temporarily skipped, because need to make a method to sort the 'Part Number' values

        // const partNumberActualAscCells: string [] = await grid.newGridReturnCellValuesByColumnName(0,
        //     'Part Number');
        // const partNumberExpectAscCells: string[] = await grid.compareAscNumberWithCharactersValues(partNumberActualAscCells.slice());
        // await expect(partNumberExpectAscCells).toEqual(partNumberActualAscCells);
        await grid.newGridOpenFilterBoxByName('Part Number');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.input, 'value'))
            .toEqual('lm315');
        await expect(await gridElements.columnsSort.ignoreSpecCharInput.isSelected()).toBeTruthy()
    });

    it('should perform search with Contains option from sort', async () => {
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait('Contains');
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Part Number', true);
        // next checks is temporarily skipped, because need to make a method to sort the 'Part Number' values

        // const partNumberActualAscCells: string [] = await grid.newGridReturnCellValuesByColumnName(0,
        //     'Part Number');
        // const partNumberExpectAscCells: string[] = await grid.compareAscNumberWithCharactersValues(partNumberActualAscCells.slice());
        // await expect(partNumberExpectAscCells).toEqual(partNumberActualAscCells);
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'value'))
            .toEqual('lm315');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual(quickSearchData.typeLabels[1])
    });

    it('should be search search options after with Contains option from sort', async () => {
        await grid.newGridOpenFilterBoxByName('Part Number');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.input, 'value'))
            .toEqual('lm315');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.dropdownInput, 'value'))
            .toEqual('Contains');
    });

    it('should be not option to search with empty value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });


    it('should be not option to search with space as a value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, ' ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });

    it('should be not option to search with 1 char as a value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '1');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });

    it('should be not option to search with 3 chars as a value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '123');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });

    it('should perform search with valid value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '7894');
        await grid.peformSearchInColumnSort(gridElements.newGridCellByRowIndex(0).get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Part Number', true);
        // next test is temporarily skipped, because need to make a method to sort the 'Part Number' values

        // const partNumberActualAscCells: string [] = await grid.newGridReturnCellValuesByColumnName(0,
        //     'Part Number');
        // const partNumberExpectAscCells: string[] = await grid.compareAscNumberWithCharactersValues(partNumberActualAscCells.slice());
        // await expect(partNumberExpectAscCells).toEqual(partNumberActualAscCells);
        await grid.newGridOpenFilterBoxByName('Part Number');
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'value'))
            .toEqual('7894');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual(quickSearchData.typeLabels[1])
    });

    it('should be notification modal for 45 ~$`\'@%^&()-_={}\\[]:;<>/|"?.4', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '45 ~$`\'@%^&()-_={}\\[]:;<>/|"?.4');
        await grid.peformSearchInColumnSort(modal.modalBody);
        const modalText: string = "A Part Number Contains search does not support the use of " +
            "the Boolean OR search operator. Please limit your search to a single part number," +
            " or change your search type to Part # Starts With or Exact Part #";
        await expect(await modal.modalBody.getText()).toEqual(modalText);
    });

    it('should close notification ', async () => {
        await modal.closeModalWithButton(buttonNames.okayThanks);
        expect(await gridElements.newGridSimpleTextCell.get(0).isPresent()).toBeTruthy();
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'value'))
            .toEqual('7894');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual(quickSearchData.typeLabels[1])
    });

    it('should be search criteria in advanced search ', async () => {
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField, 'value'))
            .toEqual('7894');
        await expect(await searchElements.parts.partsSearchRadioButtonsInputs.get(2).isSelected()).toBeTruthy();
    });
});
