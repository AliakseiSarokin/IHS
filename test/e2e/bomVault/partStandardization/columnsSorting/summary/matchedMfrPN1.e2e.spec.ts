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

describe('Part Standardisation - Summary Tab - Matched Mfr P/N column sort', ()=> {
    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('matchedMfrPN', 6);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('matchedMfrPN');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'matchedMfrPN');
        await partStandardizationLogic.goToSummaryTab();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Matched Mfr P/N');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(200);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Matched Mfr P/N', false);
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Matched Mfr P/N', true);
        const mfrPNActualAscValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr P/N')).filter(String);
        const mfrPNExpectAscValues: string[] = await grid.compareAscValues(mfrPNActualAscValues.slice());
        await expect(await mfrPNExpectAscValues).toEqual(mfrPNActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Matched Mfr P/N', false);
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Matched Mfr P/N', true);
        const mfrPNActualDescValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr P/N')).filter(String);
        const mfrPNExpectDescValues: string[] = await grid.compareDescValues(mfrPNActualDescValues.slice());
        await expect(await mfrPNExpectDescValues).toEqual(mfrPNActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Matched Mfr P/N', false);
        await expect(await gridElements.ascSortHeaderIconByName('Matched Mfr P/N').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Matched Mfr P/N').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Matched Mfr P/N');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(155);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Matched Mfr P/N');
        await toolbar.unhideCellNameWithUnhideAllByNumber('Matched Mfr P/N',1);
    });
});

describe('Part Standardisation - Summary Tab - Matched Mfr P/N column filter', ()=> {
    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('matchedMfrPN', 6);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('matchedMfrPN');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'matchedMfrPN');
        await partStandardizationLogic.goToSummaryTab();
    });

    it('should be validation rules for filter', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.sendKeys(gridElements.columnsSort.input, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '3');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[0] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Mfr P/N',
            false);
        const mfrPNValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr P/N');
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, mfrPNValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Mfr P/N',
            true);
        const bomNameValuesAfterSorting: string[] =  await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr P/N');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(await bomNameValuesAfterSorting[i]).toContain(mfrPNValues[0]);
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Mfr P/N',
            false);
        const mfrPNValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr P/N');
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, mfrPNValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Mfr P/N',
            true);
        const bomNameValuesAfterSorting: string[] =  await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr P/N');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(await bomNameValuesAfterSorting[i]).toEqual(mfrPNValues[0]);
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Mfr P/N',
            false);
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'lm');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Mfr P/N',
            true);
        const matchedMfrValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr P/N');
        for (let i: number = 0; i < matchedMfrValuesAfterSorting.length; i++) {
            await expect(await matchedMfrValuesAfterSorting[i].toLowerCase().indexOf('lm') === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        const values: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr P/N');
        const sortValue: string = values[0].slice(0,2);
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        const matchedMfrValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr P/N');
        await grid.newGridOpenFilterBoxByName('Matched Mfr P/N');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Mfr P/N',
            false);
        const matchedMfrValuesAfterClearing: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr P/N');
        await expect(matchedMfrValuesAfterSorting).not.toEqual(matchedMfrValuesAfterClearing);
    });
});