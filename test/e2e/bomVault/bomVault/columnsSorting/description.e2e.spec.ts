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

describe('BOM Vault - Description column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Owner', 'Match Status', 'Mfr Exceptions', 'Part Exceptions']);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Description');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 4))
            .toEqual(450);
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('Description');
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
            'Description', false);
        await grid.newGridOpenFilterBoxByName('Description');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Description', true);
        const descriptionActualAscValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'Description')).filter(String);
        const descriptionExpectAscValues: string[] = await grid.compareAscValues(descriptionActualAscValues.slice());
        await expect(descriptionExpectAscValues).toEqual(descriptionActualAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Description', false);
        await grid.newGridOpenFilterBoxByName('Description');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Description', true);
        const descriptionActualDescValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'Description')).filter(String);
        const descriptionExpectDescValues: string[] = await grid.compareDescValues(descriptionActualDescValues.slice());
        await expect(descriptionActualDescValues).toEqual(descriptionExpectDescValues);
    });

    it('should be Clear sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Description');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const descriptionAscValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'Description')).filter(String);
        await grid.newGridOpenFilterBoxByName('Description');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Description', false);
        const descriptionClearValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'Description')).filter(String);
        await expect(descriptionAscValues).not.toEqual(descriptionClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Description');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await await grid.newGridOpenFilterBoxByName('Description');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Owner', 'Match Status', 'Mfr Exceptions', 'Part Exceptions']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Description');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 4))
            .toEqual(450);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Description');
        await toolbar.unhideCellNameWithCellValue('Description');
    });
});


describe('BOM Vault - Description column filter', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Owner', 'Match Status', 'Mfr Exceptions', 'Part Exceptions']);
    });

    it('should be validation rules for filtering', async () => {
        await grid.newGridOpenFilterBoxByName('Description');
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
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Description',
            false);
        await grid.newGridOpenFilterBoxByName('Description');
        await grid.switchToFilterColumnMenu();
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.newGridDropdownInput,
            'value')).toEqual(columnHeaders.bom.filterOptions[0]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'cript');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Description',
            true);
        const descriptionValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Description');
        for (let i: number = 0; i < descriptionValues.length; i++) {
            await expect(descriptionValues[i].toLowerCase()).toContain('cript');
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[2] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Description',
            false);
        const descriptionValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'BOM Path')).filter(String); //here we take number for BOM Path columnHeader because new grid turn over cells values
        await grid.newGridOpenFilterBoxByName('Description');
        await grid.switchToFilterColumnMenu();
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[2]);
        await Actions.sendKeys(gridElements.columnsSort.input, descriptionValues[0]);
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Description',
            true);
        const descriptionValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Description');
        for (let i: number = 0; i < descriptionValuesAfterSorting.length; i++) {
            await expect(descriptionValuesAfterSorting[i]).toEqual(descriptionValues[0]);
        }
    });

    it('should sorting with ' + columnHeaders.bom.filterOptions[1] + ' option', async () => {
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Description',
            false);
        await grid.newGridOpenFilterBoxByName('Description');
        await grid.switchToFilterColumnMenu();
        await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[1]);
        await Actions.sendKeys(gridElements.columnsSort.input, 'desc');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Description',
            true);
        const descriptionValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Description');
        for (let i: number = 0; i < descriptionValuesAfterSorting.length; i++) {
            await expect(descriptionValuesAfterSorting[i].toLowerCase().indexOf('desc') === 0).toBeTruthy();
        }
    });

    it('should work Clear Filter button', async () => {
        await grid.newGridOpenFilterBoxByName('Description');
        await grid.switchToFilterColumnMenu();
        await Actions.sendKeys(gridElements.columnsSort.input, 'desc');
        await grid.peformSearchInColumnSort(gridElements.newGridRows.get(0));
        const descriptionValuesAfterSorting: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Description');
        await grid.newGridOpenFilterBoxByName('Description');
        await button.clickOnTheElementAndWait(button.returnButtonByText(buttonNames.clearFilter), gridElements.newGridRows.get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, 'Description',
            false);
        const descriptionValuesAfterClearing: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Description');
        await expect(descriptionValuesAfterSorting).not.toEqual(descriptionValuesAfterClearing);
    });
});
