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
import {TypeAhead} from "../../../../../../components/typeAhead";

const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const typeAhead: TypeAhead = new TypeAhead();

describe('Part Standardisation - Summary Tab - Matched Mfr Name column sort', ()=> {
    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('matchedMfrName', 6);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('matchedMfrName');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'matchedMfrName');
        await partStandardizationLogic.goToSummaryTab();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Matched Mfr Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(200);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Matched Mfr Name', false);
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Matched Mfr Name', true);
        const mfrNameActualAscValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr Name')).filter(String);
        const mfrNameExpectAscValues: string[] = await grid.compareAscValues(mfrNameActualAscValues.slice());
        await expect(await mfrNameExpectAscValues).toEqual(mfrNameActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Matched Mfr Name', false);
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Matched Mfr Name', true);
        const mfrNameActualDescValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr Name')).filter(String);
        const mfrNameExpectDescValues: string[] = await grid.compareDescValues(mfrNameActualDescValues.slice());
        await expect(await mfrNameExpectDescValues).toEqual(mfrNameActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Matched Mfr Name', false);
        await expect(await gridElements.ascSortHeaderIconByName('Matched Mfr Name').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Matched Mfr Name').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Matched Mfr Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(167);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Matched Mfr Name');
        await toolbar.unhideCellNameWithUnhideAllByNumber('Matched Mfr Name',1);
    });
});

describe('Part Standardisation - Summary Tab - Matched Mfr Name column filter', ()=> {
    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('matchedMfrName', 8);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('matchedMfrName');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'matchedMfrName');
        await partStandardizationLogic.goToSummaryTab();
    });

    it('should be validation rules for filter', async () => {
        const values: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr Name');
        const sortValue: string = values[0].slice(0,3);
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await typeAhead.typeAheadChecking(gridElements.columnsSort.mfrTypeAhead, sortValue);
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await button.clickOnTheElement(gridElements.columnsSort.xButtonSelectedTags.get(0));
        await typeAhead.typeAheadChecking(gridElements.columnsSort.mfrTypeAhead, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });

    it('should sorting with type ahead option', async () => {
        const values: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr Name');
        const sortValue: string = values[0].slice(0,3);
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await typeAhead.typeAheadChecking(partStandardization.filterInputInMatchMfrNameColumn, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridBodies.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Mfr Name',
            true);
        const mfrNameValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr Name');
        for (let i: number = 0; i < mfrNameValuesAfterSorting.length; i++) {
            await expect(mfrNameValuesAfterSorting[i].toLowerCase().indexOf(sortValue.toLowerCase()) === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        const values: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr Name');
        const sortValue: string = values[0].slice(0,4);
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await typeAhead.typeAheadChecking(partStandardization.filterInputInMatchMfrNameColumn, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridBodies.last());
        const mfrNameValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr Name');
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched Mfr Name',
            false);
        const mfrNameValuesAfterClearing: string[] = await partStandardizationLogic.returnCellValuesByColumnNameSummaryTab('Matched Mfr Name');
        await expect(mfrNameValuesAfterSorting).not.toEqual(mfrNameValuesAfterClearing);
    });
});