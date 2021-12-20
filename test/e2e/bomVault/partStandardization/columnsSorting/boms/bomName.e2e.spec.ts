import {Actions} from "../../../../../../utils/actions";
import {Button} from "../../../../../../components/simple/button";
import {browser} from "protractor";
import {
    buttonNames, columnHeaders, meganavItems
} from "../../../../../../testData/global";
import {Dropdown} from "../../../../../../components/dropdown";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {Grid} from "../../../../../../components/grid";
import {gridElements, partStandardization} from "../../../../../../elements/elements";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {Toolbar} from "../../../../../../components/toolbar";
import {PartStandardizationLogic} from "../../../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {partStandardData} from "../../../../../../testData/partStandard";
import {Modal} from "../../../../../../components/modal";

const button: Button = new Button;
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const toolbar: Toolbar = new Toolbar();
const modal: Modal = new Modal();

describe('Part Standardisation - BOMs Tab - BOM Name column', () => {

    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('bomNameBomTabsort', 8);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('bomNameBomTabsort');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'bomNameBomTabsort');
        await partStandardizationLogic.goToBomsTab();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'BOM Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(276);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM Name', false);
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM Name', true);
        const bomNameActualAscValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Name');
        const bomNameExpectAscValues: string[] = await grid.compareAscValues(bomNameActualAscValues.slice());
        await expect(await bomNameExpectAscValues).toEqual(bomNameActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'BOM Name', false);
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'BOM Name', true);
        const bomNameActualDescValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Name');
        const bomNameExpectDescValues: string[] = await grid.compareDescValues(bomNameActualDescValues.slice());
        await expect(await bomNameExpectDescValues).toEqual(bomNameActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM Name', false);
        await expect(await gridElements.ascSortHeaderIconByName('BOM Name').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('BOM Name').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'BOM Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(276);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('BOM Name');
        await toolbar.unhideCellNameWithUnhideAllByNumber('BOM Name',1);
    });
});

describe('Part Standardisation - BOMs Tab - BOM Name column filter', () => {

    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('bomNameBomTabFilter', 8);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('bomNameBomTabFilter');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'bomNameBomTabFilter');
        await partStandardizationLogic.goToBomsTab();
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.sendKeys(gridElements.columnsSort.input, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '3');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[0] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Name',
            false);
        const values: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Name');
        const sortValue: string = await values[0].slice(0,2);
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Name',
            true);
        const bomNameValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Name');
        for (let i: number = 0; i < bomNameValues.length; i++) {
            await expect(await bomNameValues[i].toLowerCase()).toContain(sortValue.toLowerCase());
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Name',
            false);
        const bomNameValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Name');
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, bomNameValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Name',
            true);
        const bomNameValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Name');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(await bomNameValuesAfterSorting[i]).toEqual(bomNameValues[0]);
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Name',
            false);
        const values: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Name');
        const sortValue: string = await values[0].slice(0,4);
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Name',
            true);
        const bomNameValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Name');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(await bomNameValuesAfterSorting[i].toLowerCase().indexOf(sortValue) === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Name',
            false);
        const values: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Name');
        const sortValue: string = values[0].slice(0,2);
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        const bomNameValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Name');
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Name',
            false);
        const bomNameValuesAfterClearing: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Name');
        await expect(bomNameValuesAfterSorting).not.toEqual(bomNameValuesAfterClearing);
    });
});
