import {browser} from "protractor";
import {
    buttonNames,
    columnHeaders, meganavItems, titles
} from "../../../../../testData/global";

import {Button} from "../../../../../components/simple/button";
import {Grid} from "../../../../../components/grid";
import {gridElements, pageTitles, dropdownElements} from "../../../../../elements/elements";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Toolbar} from "../../../../../components/toolbar";
import {Actions} from "../../../../../utils/actions";
import {Dropdown} from "../../../../../components/dropdown";
import {columnIdByColumnName} from "../../../../../testData/columnIdByColumnName";

const button: Button = new Button();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('View Manufacturer Preferences- Matched On - column filtering', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewMfrPref, gridElements.checkboxSelector.get(1));
        expect(await pageTitles.pageTitleShim2.getText()).toEqual(titles.viewMfrPref);
        await toolbar.removeWithClearAll();
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridOpenFilterBoxByName('Matched On');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.sendKeys(gridElements.columnsSort.input, '   ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, '3');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should filter with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await Dropdown.openDropdownByClickOnElement(toolbar.simpleFilterButton);
        await button.clickOnTheElement(dropdownElements.dropdownValues.get(3));
        const values: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Matched On');
        const sortValue: string = values[0].slice(0,2);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched On',
            false);
        await grid.newGridOpenFilterBoxByName('Matched On');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions[1]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched On',
            true);
        const afterSortValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Matched On');
        for (let i: number = 0; i < afterSortValues.length; i++) {
            await expect(afterSortValues[i].toLowerCase()).toContain(sortValue.toLowerCase());
        }
    });

    it('should filter with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched On',
            true);
        const psNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Matched On');
        await grid.newGridOpenFilterBoxByName('Matched On');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, psNameValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched On',
            true);
        const psValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Matched On');
        for (let i: number = 0; i < psValuesAfterSorting.length; i++) {
            await expect(psValuesAfterSorting[i]).toEqual(psNameValues[0]);
        }
    });

    it('should filter with ' + columnHeaders.bom.filterOptions[0] + ' option', async () => {
        const psNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Matched On');
        const sortValue: string = psNameValues[0].slice(0,2);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched On',
            true);
        await grid.newGridOpenFilterBoxByName('Matched On');
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[0]);
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched On',
            true);
        const bomNameValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Matched On');
        for (let i: number = 0; i < bomNameValuesAfterSorting.length; i++) {
            await expect(bomNameValuesAfterSorting[i].toLowerCase().indexOf(sortValue.toLowerCase()) === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        const psNameValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Matched On');
        const sortValue: string = psNameValues[0].slice(0,2);
        await grid.newGridOpenFilterBoxByName('Matched On');
        await Actions.clearInputWithDelete(gridElements.columnsSort.input);
        await Actions.sendKeys(gridElements.columnsSort.input, sortValue);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Matched On');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Matched On',
            false);
        await grid.newGridOpenFilterBoxByName('Matched On');
        await expect(await button.returnButtonByText(buttonNames.clearFilter).isEnabled()).toBeTruthy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });
});

describe('View Manufacturer Preferences - Matched On - column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewMfrPref, gridElements.checkboxSelector.get(1));
        expect(await pageTitles.pageTitleShim2.getText()).toEqual(titles.viewMfrPref);
        await toolbar.removeWithClearAll();
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Matched On');
        await grid.switchToSortColumnMenu();
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Matched On');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Matched On');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Matched On');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(155);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Matched On');
        await toolbar.unhideCellNameWithUnhideAll('Matched On');
        await expect(await gridElements.newGridHeaderByName('Matched On').isDisplayed()).toBeTruthy();
    });
});
