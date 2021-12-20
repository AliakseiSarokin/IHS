import {browser} from "protractor";
import {commonSearch} from "../../../../../testData/search";
import {Grid} from "../../../../../components/grid";
import {Login} from "../../../../../components/login";
import {Toolbar} from "../../../../../components/toolbar";
import {QuickSearch} from "../../../../../components/quickSearch";
import {RadioButton} from "../../../../../components/simple/radioButton";
import {Button} from "../../../../../components/simple/button";
import {gridElements, searchElements} from "../../../../../elements/elements";
import {buttonNames, columnHeaders} from "../../../../../testData/global";
import {JasmineTimeout} from "../../../../../helper/jasmineTimeout";
import {Modal} from "../../../../../components/modal";
import {Input} from "../../../../../components/simple/input";
import {Random} from "../../../../../utils/random";
import {ConsoleErrors} from "../../../../../helper/consoleErrors";
import {Actions} from "../../../../../utils/actions";
import {Dropdown} from "../../../../../components/dropdown";

const grid: Grid = new Grid();
const login: Login = new Login();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();
const radioButton: RadioButton = new RadioButton();
const button: Button = new Button();
const modal: Modal = new Modal();
const input: Input = new Input();
const random: Random = new Random();


describe('Parts search, DE112851', () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(200000);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.waitWebElementMaxTimeout);
    });

    it('should not cell values are not converted to boolean', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await toolbar.switchLayout('Combined');
        await grid.newGridHideColumnsRange(['Rel Info',
            'LC Risk',
            'ENV Risk',
            'SC Risk',
            'Part Number',
            'Mfr Name',
            'Part Status',
            'Description',
            'Estimated YTEOL',
            'Availability (YTEOL)',
            'Life Cycle Stage',
            'Life Cycle Code',
            'LTB Date',
            'LTD Date',
            'Life Cycle Comments',
            'Alert/Prediction Date',
            'Date of Intro',
            'Life Cycle Information',
            'Manufacturer Support Status',
            'EU RoHS Compliant',
            'EU RoHS Version',]);
        await grid.newGridOpenFilterBoxByName('5/6 Compliant');
        await button.clickOnTheElementAndWait(gridElements.columnsSort.closeButton, gridElements.columnsSort.readchCompiliant.yesRadioButtonInput);
        await radioButton.checkRadioButton(gridElements.columnsSort.readchCompiliant.yesRadioButtonLabel,
            gridElements.columnsSort.readchCompiliant.yesRadioButtonInput);
        await button.clickByButtonNameAndWait(buttonNames.applyFilter, gridElements.newGridRows.get(1));
        const cellName: string[] = await grid.newGridReturnCellValuesByColumnName(1, '5/6 Compliant');
        await expect(await cellName[0]).toEqual('Yes');
    });

    it('applied filter should be discarded after changing layout', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.setATypeAndPerformAQuickSearch('Part # Contains', commonSearch.commonValue, gridElements.grid);
        const numberOfValues1: number[] = await gridElements.itemsCountInGrid.getText();
        await toolbar.switchLayout('Life Cycle');
        await grid.newGridHideColumnsRange(['Rel Info', 'LC Risk', 'ENV Risk', 'SC Risk', 'Part Number']);
        await grid.newGridOpenFilterBoxByName('Estimated YTEOL');
        await grid.switchToFilterColumnMenu();
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions1[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, '0');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        const numberOfValues2: number[] = await gridElements.itemsCountInGrid.getText();
        await toolbar.switchLayout('Environmental');
        const numberOfValues3: number[] = await gridElements.itemsCountInGrid.getText();
        await expect(numberOfValues2).not.toEqual(numberOfValues3);
        await expect(numberOfValues1).toEqual(numberOfValues3);
    });

});

describe('Parts search, DE112851', () => {
    it('Save search/ An unexpected error occurs when input in Description field more than 18 numeric symbols the same value', async() => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await modal.openModalWithElement(await toolbar.returnToolbarButtonByValue(buttonNames.saveSearch));
        await input.fillFieldWithValue(searchElements.saveSearchNameField, random.randomTextGenerator(10));
        await input.fillFieldWithValue(searchElements.saveSearchDescriptionField, '99999999999999999999999999999');
        await modal.closeModalWithButton(buttonNames.saveAndReturnToResults);
        await expect(await ConsoleErrors.getConsoleErrors()).toEqual([]);
    });
});

