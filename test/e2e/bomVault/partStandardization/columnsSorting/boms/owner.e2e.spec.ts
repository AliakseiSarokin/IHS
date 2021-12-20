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
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const modal: Modal = new Modal();

describe('Part Standardisation - BOMs Tab - Owner column', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await partStandardizationLogic.goToBomsTab();
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Owner');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Owner', false);
        await grid.newGridOpenFilterBoxByName('Owner');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Owner', true);
        const bomOwnerActualAscValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Owner');
        const bomOwnerExpectAscValues: string[] = (await grid.compareAscValues(bomOwnerActualAscValues.slice())).sort();
        await expect(await bomOwnerExpectAscValues).toEqual(bomOwnerActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Owner', false);
        await grid.newGridOpenFilterBoxByName('Owner');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Owner', true);
        const bomOwnerActualDescValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Owner');
        const bomOwnerExpectDescValues: string[] = (await grid.compareDescValues(bomOwnerActualDescValues.slice())).sort().reverse();
        await expect(await bomOwnerExpectDescValues).toEqual(bomOwnerActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Owner');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await grid.newGridOpenFilterBoxByName('Owner');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.last());
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Owner', false);
        await expect(await gridElements.ascSortHeaderIconByName('Owner').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Owner').isDisplayed()).toBeFalsy();
    });


    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Owner');
        await toolbar.unhideCellNameWithUnhideAllByNumber('Owner',1);
    });
});


describe('Part Standardisation - BOMs Tab - Owner column filter', () => {

    beforeAll(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('ownerBomTab', 8);
    });

    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName('ownerBomTab');
    });

    beforeEach(async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', 'ownerBomTab');
        await partStandardizationLogic.goToBomsTab();
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridOpenFilterBoxByName('Owner');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.sendKeys(gridElements.columnsSort.input, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '3');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[0] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            false);
        await grid.newGridOpenFilterBoxByName('Owner');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'b4testad');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            true);
        const bomOwnerValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Owner');
        for (let i: number = 0; i < bomOwnerValues.length; i++) {
            await expect(await bomOwnerValues[i].toLowerCase()).toContain('b4testad');
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            false);
        const bomOwnerValues: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Owner');
        await grid.newGridOpenFilterBoxByName('Owner');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, bomOwnerValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridBodies.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            true);
        const bomOwnerValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Owner');
        for (let i: number = 0; i < bomOwnerValuesAfterSorting.length; i++) {
            await expect(await bomOwnerValuesAfterSorting[i]).toEqual(bomOwnerValues[0]);
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            false);
        await grid.newGridOpenFilterBoxByName('Owner');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'b4testad');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            true);
        const bomOwnerValuesAfterSorting: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Owner');
        for (let i: number = 0; i < bomOwnerValuesAfterSorting.length; i++) {
            await expect(await bomOwnerValuesAfterSorting[i].toLowerCase().indexOf('b4testad') === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            false);
        const values: string[] = await partStandardizationLogic.returnCellValuesByColumnNameBomsTab('Owner');
        const sortValue: string = values[0].slice(0,3);
        await grid.newGridOpenFilterBoxByName('Owner');
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridBodies.last());
        await grid.newGridOpenFilterBoxByName('Owner');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.last());
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            false);
        await expect(await gridElements.filterHeaderIconByName('Owner').isDisplayed()).toBeFalsy();
    });
});
