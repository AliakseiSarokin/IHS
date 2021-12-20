import {Button} from "../../../../../../components/simple/button";
import {
    gridElements,
    partStandardization,
} from "../../../../../../elements/elements";
import {browser} from "protractor";
import {
    buttonNames, columnHeaders,
    meganavItems,
} from "../../../../../../testData/global";
import {Grid} from "../../../../../../components/grid";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Modal} from "../../../../../../components/modal";
import {Actions} from "../../../../../../utils/actions";
import {Dropdown} from "../../../../../../components/dropdown";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {partStandardData} from "../../../../../../testData/partStandard";
import {Toolbar} from "../../../../../../components/toolbar";

const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardisation - Summary Tab - Imported Mfr Name column sort', ()=> {
    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('importedMfrName', 6);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('importedMfrName');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'importedMfrName');
        await partStandardizationLogic.goToSummaryTab();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Imported Mfr Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(200);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sort', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Imported Mfr Name', false);
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Imported Mfr Name', true);
        const summaryNameActualAscValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Imported Mfr Name');
        const summaryNameExpectAscValues: string[] = await grid.compareAscValues(summaryNameActualAscValues.slice());
        await expect(summaryNameExpectAscValues).toEqual(summaryNameActualAscValues);
    });

    it('should be DESC sort', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Imported Mfr Name', false);
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Imported Mfr Name', true);
        const summaryNameActualDescValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Imported Mfr Name');
        const summaryNameExpectDescValues: string[] = await grid.compareDescValues(summaryNameActualDescValues.slice());
        await expect(summaryNameExpectDescValues).toEqual(summaryNameActualDescValues);
    });

    it('should be Clear sort', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Imported Mfr Name', false);
        await expect(await gridElements.ascSortHeaderIconByName('Imported Mfr Name').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Imported Mfr Name').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Imported Mfr Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(194);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Imported Mfr Name');
        await toolbar.unhideCellNameWithUnhideAllByNumber('Imported Mfr Name',1);
    });
});

describe('Part Standardisation - Summary Tab - Imported Mfr Name column filter', ()=> {
    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('importedMfrName', 8);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('importedMfrName');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'importedMfrName');
        await partStandardizationLogic.goToSummaryTab();
    });

    it('should be validation rules for filter', async () => {
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.sendKeys(gridElements.columnsSort.input, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '3');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Imported Mfr Name',
            false);
        const bomNameValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Imported Mfr Name');
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, bomNameValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Imported Mfr Name',
            true);
        const bomNameValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Imported Mfr Name');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(bomNameValuesAfterSorting[i]).toEqual(bomNameValues[0]);
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Imported Mfr Name',
            false);
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'te');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Imported Mfr Name',
            true);
        const bomNameValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Imported Mfr Name');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(bomNameValuesAfterSorting[i].toLowerCase().indexOf('te') === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        const values: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Imported Mfr Name');
        const sortValue: string = values[0].slice(0,2);
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        const bomNameValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Imported Mfr Name');
        await grid.newGridOpenFilterBoxByName('Imported Mfr Name');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Imported Mfr Name',
            false);
        const bomNameValuesAfterClearing: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Imported Mfr Name');
        await expect(bomNameValuesAfterSorting).not.toEqual(bomNameValuesAfterClearing);
    });
});
