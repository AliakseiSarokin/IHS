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

describe('BOM Vault - BOM File Name column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM File Name', false);
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM File Name', true);
        const bomFileNameActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM File Name');
        const bomFileNameExpectAscValues: string[] = await bomFileNameActualAscValues.slice().sort();
        await expect(bomFileNameExpectAscValues).toEqual(bomFileNameActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'BOM File Name', false);
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'BOM File Name', true);
        const bomFileNameActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM File Name');
        const bomFileNameExpectDescValues: string[] = await bomFileNameActualDescValues.slice().sort().reverse();
        await expect(bomFileNameActualDescValues).toEqual(bomFileNameExpectDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const bomFileNameAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM File Name');
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'BOM File Name', false);
        const bomFileNameClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM File Name');
        await expect(bomFileNameAscValues).not.toEqual(bomFileNameClearValues);
    });

    it('should work Reset columns', async () => { //here bug on the application side
        await grid.newGridHideColumnsRange(['Owner']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'BOM File Name');
        const defaultWidth: number = await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 4);
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 4))
            .toBeLessThan(defaultWidth, 2);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('BOM File Name');
        await toolbar.unhideCellNameWithCellValue('BOM File Name');
    });
});


describe('BOM Vault - BOM File Name column filter', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.sendKeys(gridElements.columnsSort.input, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '3');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[0] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM File Name',
            false);
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'RegBOM');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM File Name',
            true);
        const bomFileNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM File Name');
        for (let i: number = 0; i < bomFileNameValues.length; i++) {
            await expect(bomFileNameValues[i].toLowerCase()).toContain('regbom');
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM File Name',
            false);
        const bomFileNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM File Name');
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, bomFileNameValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM File Name',
            true);
        const bomFileNameValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM File Name');
        for (let i: number = 0; i < bomFileNameValuesAfterSorting.length; i++) {
            await expect(bomFileNameValuesAfterSorting[i]).toEqual(bomFileNameValues[0]);
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM File Name',
            false);
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'AutoReg');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM File Name',
            true);
        const bomFileNameValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM File Name');
        for (let i: number = 0; i < bomFileNameValuesAfterSorting.length; i++) {
            await expect(bomFileNameValuesAfterSorting[i].toLowerCase().indexOf('autoreg') === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await Actions.sendKeys(gridElements.columnsSort.input, 'RegBOM');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        const bomFileNameValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM File Name');
        await grid.newGridOpenFilterBoxByName('BOM File Name');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'BOM File Name',
            false);
        const bomFileNameValuesAfterClearing: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'BOM File Name');
        await expect(bomFileNameValuesAfterSorting).not.toEqual(bomFileNameValuesAfterClearing);
    });
});
