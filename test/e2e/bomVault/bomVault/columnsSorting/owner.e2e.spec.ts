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
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Toolbar} from "../../../../../components/toolbar";

const button: Button = new Button;
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('BOM Vault - Owner column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Owner');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0)));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Owner', false);
        await grid.newGridOpenFilterBoxByName('Owner');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Owner', true);
        const bomOwnerActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Owner');
        const bomOwnerExpectAscValues: string[] = await grid.compareAscValues(bomOwnerActualAscValues.slice());
        await expect(bomOwnerExpectAscValues).toEqual(bomOwnerActualAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Owner', false);
        await grid.newGridOpenFilterBoxByName('Owner');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Owner', true);
        const bomOwnerActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Owner');
        const bomOwnerExpectDescValues: string[] = await grid.compareDescValues(bomOwnerActualDescValues.slice());
        await expect(bomOwnerExpectDescValues).toEqual(bomOwnerActualDescValues);
    });

    it('should be Clear sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Owner');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const bomOwnerAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Owner');
        await grid.newGridOpenFilterBoxByName('Owner');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Owner', false);
        const bomOwnerClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Owner');
        await expect(bomOwnerAscValues).not.toEqual(bomOwnerClearValues);
    });


    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Owner');
        await toolbar.unhideCellNameWithUnhideAll('Owner');
    });
});


describe('BOM Vault - Owner column filter', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
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
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            true);
        const bomOwnerValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Owner');
        for (let i: number = 0; i < bomOwnerValues.length; i++) {
            await expect(bomOwnerValues[i].toLowerCase()).toContain('b4testad');
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            false);
        const bomOwnerValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Owner');
        await grid.newGridOpenFilterBoxByName('Owner');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, bomOwnerValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            true);
        const bomOwnerValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Owner');
        for (let i: number = 0; i < bomOwnerValuesAfterSorting.length; i++) {
            await expect(bomOwnerValuesAfterSorting[i]).toEqual(bomOwnerValues[0]);
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            false);
        await grid.newGridOpenFilterBoxByName('Owner');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'b4testad');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            true);
        const bomOwnerValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Owner');
        for (let i: number = 0; i < bomOwnerValuesAfterSorting.length; i++) {
            await expect(bomOwnerValuesAfterSorting[i].toLowerCase().indexOf('b4testad') === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        await grid.newGridOpenFilterBoxByName('Owner');
        await Actions.sendKeys(gridElements.columnsSort.input, 'b4testad');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        const bomOwnerValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Owner');
        await grid.newGridOpenFilterBoxByName('Owner');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Owner',
            false);
        const bomOwnerValuesAfterClearing: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Owner');
        await expect(bomOwnerValuesAfterSorting).not.toEqual(bomOwnerValuesAfterClearing);
    });
});
