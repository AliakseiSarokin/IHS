import {Actions} from "../../../../../utils/actions";
import {Button} from "../../../../../components/simple/button";
import {browser} from "protractor";
import {
    buttonNames, columnHeaders, meganavItems
} from "../../../../../testData/global";
import {Dropdown} from "../../../../../components/dropdown";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {Grid} from "../../../../../components/grid";
import {gridElements} from "../../../../../elements/elements";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Toolbar} from "../../../../../components/toolbar";
import {JasmineTimeout} from "../../../../../helper/jasmineTimeout";

const button: Button = new Button;
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('BOM Summary - User Name column', () => {


    afterAll(async() => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Total', 'Total', 'Unique', 'Total', 'Unique', 'Total', 'Unique']);
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
            'Without Alts', 'SS', 'MS', 'Total', 'Unique', 'Assembly Health Score', 'RoHS Non-Compliant', 'REACH Compliant']);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('User Name');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'User Name', false);
        await grid.newGridOpenFilterBoxByName('User Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'User Name', true);
        const bomNameActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'User Name');
        const bomNameExpectAscValues: string[] = await grid.compareAscValues(bomNameActualAscValues.slice());
        await expect(bomNameExpectAscValues).toEqual(bomNameActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'User Name', false);
        await grid.newGridOpenFilterBoxByName('User Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'User Name', true);
        const bomNameActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'User Name');
        const bomNameExpectDescValues: string[] = await grid.compareDescValues(bomNameActualDescValues.slice());
        await expect(bomNameExpectDescValues).toEqual(bomNameActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('User Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const bomNameAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'User Name');
        await grid.newGridOpenFilterBoxByName('User Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'User Name', false);
        const bomNameClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'User Name');
        await expect(bomNameAscValues).not.toEqual(bomNameClearValues);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('User Name');
        await toolbar.unhideCellNameWithUnhideAll('Not Matched');
        await grid.newGridHideColumnsRange(['Total', 'Total', 'Unique', 'Total', 'Unique', 'Total', 'Unique']);
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
            'Without Alts', 'SS', 'MS', 'Total', 'Unique', 'Assembly Health Score', 'RoHS Non-Compliant', 'REACH Compliant']);
        await expect(await gridElements.newGridHeaderByName('User Name').isDisplayed()).toBeTruthy();
    });
});


describe('BOM Summary - User Name column filter', () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(260000);
    });

    afterAll(async() => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Total', 'Total', 'Unique', 'Total', 'Unique', 'Total', 'Unique']);
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
            'Without Alts', 'SS', 'MS', 'Total', 'Unique', 'Assembly Health Score', 'RoHS Non-Compliant', 'REACH Compliant']);
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridOpenFilterBoxByName('User Name');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.sendKeys(gridElements.columnsSort.input, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '3');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[0] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'User Name',
            false);
        await grid.newGridOpenFilterBoxByName('User Name');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'testkb');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'User Name',
            true);
        const bomNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'User Name');
        for (let i: number = 0; i < bomNameValues.length; i++) {
            await expect(bomNameValues[i].toLowerCase()).toContain('testkb');
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'User Name',
            false);
        const bomNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Modified Date');  //here we take number for Modified Date columnHeader because new grid turn over cells values
        await grid.newGridOpenFilterBoxByName('User Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, bomNameValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'User Name',
            true);
        const bomNameValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'User Name');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(bomNameValuesAfterSorting[i]).toEqual(bomNameValues[0]);
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'User Name',
            false);
        await grid.newGridOpenFilterBoxByName('User Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'b4test');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await expect(await gridElements.newGridFilterHeaderIconByName(4).isPresent()).toBeTruthy();
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'User Name',
            true);
        const bomNameValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'User Name');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(bomNameValuesAfterSorting[i].toLowerCase().indexOf('b4test') === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        await grid.newGridOpenFilterBoxByName('User Name');
        await Actions.sendKeys(gridElements.columnsSort.input, 'testkb');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        const bomNameValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'User Name');
        await grid.newGridOpenFilterBoxByName('User Name');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'User Name',
            false);
        const bomNameValuesAfterClearing: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'User Name');
        await expect(bomNameValuesAfterSorting).not.toEqual(bomNameValuesAfterClearing);
    });
});
