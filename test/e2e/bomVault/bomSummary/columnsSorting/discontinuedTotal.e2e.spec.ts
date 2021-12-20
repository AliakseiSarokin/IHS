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

describe('BOM Summary - Discontinued - Total column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideDuplicateColumnByName('Total');
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Total');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(86);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Total');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
        //     'Without Alts', 'SS', 'MS']);
        // await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique']);
        // await grid.newGridHideColumnByName('Assembly Health Score');
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Total', false);
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Total', true);
        const discontinuedTotalActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        const discontinuedTotalExpectAscValues: string[] = await grid.compareAscNumberValues(discontinuedTotalActualAscValues.slice());
        await expect(discontinuedTotalExpectAscValues).toEqual(discontinuedTotalActualAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
        //     'Without Alts', 'SS', 'MS']);
        // await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique']);
        // await grid.newGridHideColumnByName('Assembly Health Score');
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Total', false);
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Total', true);
        const discontinuedTotalActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        const discontinuedTotalExpectDescValues: string[] = await grid.compareDescNumberValues(discontinuedTotalActualDescValues.slice());
        await expect(discontinuedTotalExpectDescValues).toEqual(discontinuedTotalActualDescValues);
    });

    it('should be Clear sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
        //     'Without Alts', 'SS', 'MS']);
        // await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique']);
        // await grid.newGridHideColumnByName('Assembly Health Score');
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const discontinuedTotalValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Total', false);
        const discontinuedTotalClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        await expect(discontinuedTotalValues).not.toEqual(discontinuedTotalClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Total');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(86);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideDuplicateColumnByName('Total');
        await toolbar.unhideDuplicateCellNameWithUnhideAll(0, 'Not Matched');
        await expect(await gridElements.newGridUnlockedColumnHeaders.last().getText()).toEqual('Total');
    });
});
