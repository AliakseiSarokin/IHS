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
import {PartStandardizationLogic} from "../../../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Toolbar} from "../../../../../../components/toolbar";
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

describe('Part Standardisation - BOMs Tab - BOM Path column', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await partStandardizationLogic.goToBomsTab();
        await grid.newGridHideColumnsRange(['Owner', 'Match Status', 'Mfr Exceptions', 'Description']);
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'BOM Path');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(450);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM Path', false);
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM Path', true);
        const bomPathActualAscValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Path'))
            .filter(String);
        const bomPathExpectAscValues: string[] = await grid.compareAscValues(bomPathActualAscValues.slice());
        await expect(await bomPathExpectAscValues).toEqual(bomPathActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'BOM Path', false);
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'BOM Path', true);
        const bomPathActualDescValues: string[] = (await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Path')).filter(String);
        const bomPathExpectDescValues: string[] = await grid.compareDescValues(bomPathActualDescValues.slice());
        await expect(await bomPathActualDescValues).toEqual(bomPathExpectDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM Path', false);
        await expect(await gridElements.ascSortHeaderIconByName('BOM Path').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('BOM Path').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.last());
        await grid.newGridHideColumnsRange(['Owner', 'Match Status', 'Mfr Exceptions', 'Description']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'BOM Path');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(450);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('BOM Path');
        await toolbar.unhideCellNameWithUnhideAllByNumber('Owner',1);
    });
});


describe('Part Standardization - BOM Path column filter', () => {

    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('bomPathBomTab',  8);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('bomPathBomTab');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'bomPathBomTab');
        await partStandardizationLogic.goToBomsTab();
        await grid.newGridHideColumnsRange(['BOM Name','Owner', 'Match Status', 'Mfr Exceptions', 'Description']);
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToFilterColumnMenu();
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.sendKeys(gridElements.columnsSort.input, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '3');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[0] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            false);
        const bomPath: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Path');
        const sortValue: string = bomPath[0].slice(0,2);
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToFilterColumnMenu();
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridBodies.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            true);
        const bomPathValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Path');
        for (let i: number = 0; i < bomPathValues.length; i++) {
            await expect(await bomPathValues[i].toLowerCase()).toContain(sortValue);
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            false);
        const bomPathValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Path'); //here we take number for Last Modified columnHeader because new grid turn over cells values
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToFilterColumnMenu();
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, bomPathValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridBodies.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            true);
        const bomPathValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Path');
        for (let i: number = 0; i < bomPathValuesAfterSorting.length; i++) {
            await expect(await bomPathValuesAfterSorting[i]).toEqual(bomPathValues[0]);
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            false);
        const psNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path');
        const sortValue: string = psNameValues[0].slice(0,2);
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToFilterColumnMenu();
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridBodies.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            true);
        const bomPathValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('BOM Path');
        for (let i: number = 0; i < bomPathValuesAfterSorting.length; i++) {
            await expect(await bomPathValuesAfterSorting[i].toLowerCase().indexOf(sortValue.toLowerCase()) === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToFilterColumnMenu();
        await Actions.sendKeys(gridElements.columnsSort.input, 'Folder');
        await grid.peformSearchInColumnSort(gridElements.newGridBodies.last());
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            false);
        await expect(await gridElements.filterHeaderIconByName('BOM Path').isDisplayed()).toBeFalsy();
    });
});
