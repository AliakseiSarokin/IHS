import {browser} from "protractor";
import {
    columnHeaders, meganavItems
} from "../../../../../testData/global";
import {Grid} from "../../../../../components/grid";
import {gridElements} from "../../../../../elements/elements";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Toolbar} from "../../../../../components/toolbar";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('BOM Vault - Part Exceptions column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be sort option', async () => {
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Part Exceptions', false);
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Part Exceptions', true);
        const partExceptionsActualAscValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'Part Exceptions')).filter(String);
        const partExceptionsExpectAscValues: string[] = await grid.compareAscNumberValues(partExceptionsActualAscValues.slice());
        await expect(partExceptionsActualAscValues).toEqual(partExceptionsExpectAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Part Exceptions', false);
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Part Exceptions', true);
        const partExceptionsActualDescValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'Part Exceptions')).filter(String);
        const partExceptionsExpectDescValues: string[] = await grid.compareDescNumberValues(partExceptionsActualDescValues.slice());
        await expect(partExceptionsActualDescValues).toEqual(partExceptionsExpectDescValues);
    });

    it('should be Clear sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const partExceptionsAscValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'Part Exceptions')).filter(String);
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Part Exceptions', false);
        const partExceptionsClearValues: string[] = (await grid.newGridReturnCellValuesByColumnName(1,
            'Part Exceptions')).filter(String);
        await expect(partExceptionsAscValues).not.toEqual(partExceptionsClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Part Exceptions');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Part Exceptions');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 4)).toEqual(122);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Part Exceptions');
        await toolbar.unhideCellNameWithUnhideAll('Part Exceptions');
    });
});
