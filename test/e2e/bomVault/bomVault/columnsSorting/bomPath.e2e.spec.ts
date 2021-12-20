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

describe('BOM Vault - BOM Path column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Owner', 'Match Status', 'Mfr Exceptions', 'Part Exceptions',
            'Description']);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'BOM Path');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 4))
            .toEqual(450);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM Path', false);
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM Path', true);
        const bomPathActualAscValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path')).filter(String);
        const bomPathExpectAscValues: string[] = await grid.compareAscValues(bomPathActualAscValues.slice());
        await expect(bomPathExpectAscValues).toEqual(bomPathActualAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'BOM Path', false);
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'BOM Path', true);
        const bomPathActualDescValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path')).filter(String);
        const bomPathExpectDescValues: string[] = await grid.compareDescValues(bomPathActualDescValues.slice());
        await expect(bomPathActualDescValues).toEqual(bomPathExpectDescValues);
    });

    it('should be Clear sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const bomPathAscValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path')).filter(String);
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM Path', false);
        const bomPathClearValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path')).filter(String);
        await expect(bomPathAscValues).not.toEqual(bomPathClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Owner', 'Match Status', 'Mfr Exceptions', 'Part Exceptions',
            'Description']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'BOM Path');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 4))
            .toEqual(450);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('BOM Path');
        await toolbar.unhideCellNameWithCellValue('BOM Path');
    });
});


describe('BOM Vault - BOM Path column filter', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Owner', 'Match Status', 'Mfr Exceptions', 'Part Exceptions',
            'Description']);
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
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToFilterColumnMenu();
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'Folder');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            true);
        const bomPathValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path');
        for (let i: number = 0; i < bomPathValues.length; i++) {
            await expect(bomPathValues[i].toLowerCase()).toContain('folder');
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        const bomPathValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path'); //here we take number for Last Modified columnHeader because new grid turn over cells values
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            false);
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToFilterColumnMenu();
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'AUTOMATION_Indentured');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            true);
        const bomPathValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path');
        for (let i: number = 0; i < bomPathValuesAfterSorting.length; i++) {
            await expect(bomPathValuesAfterSorting[i]).toEqual('AUTOMATION_Indentured');
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            false);
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToFilterColumnMenu();
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'Auto');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            true);
        const bomPathValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path');
        for (let i: number = 0; i < bomPathValuesAfterSorting.length; i++) {
            await expect(bomPathValuesAfterSorting[i].toLowerCase().indexOf('auto') === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await grid.switchToFilterColumnMenu();
        await Actions.sendKeys(gridElements.columnsSort.input, 'Folder');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        const bomPathValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path');
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM Path',
            false);
        const bomPathValuesAfterClearing: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path');
        await expect(bomPathValuesAfterSorting).not.toEqual(bomPathValuesAfterClearing);
    });
});
