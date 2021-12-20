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

describe('BOM Summary - Discontinued - With Alts column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'With Alts');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(110);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('With Alts');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Total', 'Total', 'Unique', 'Total', 'Unique', 'Total', 'Unique',
        //     'Total', 'Unique']);
        // await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'Without Alts', 'SS', 'MS']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'With Alts', false);
        await grid.newGridOpenFilterBoxByName('With Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'With Alts', true);
        const discontinuedWithAltsActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'With Alts');
        const discontinuedWithAltsExpectAscValues: string[] = await grid.compareAscNumberValues(discontinuedWithAltsActualAscValues.slice());
        await expect(discontinuedWithAltsExpectAscValues).toEqual(discontinuedWithAltsActualAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Total', 'Total', 'Unique', 'Total', 'Unique', 'Total', 'Unique',
        //     'Total', 'Unique']);
        // await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'Without Alts', 'SS', 'MS']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('With Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        const discontinuedWithAltsActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'With Alts');
        const discontinuedWithAltsExpectDescValues: string[] = await grid.compareDescNumberValues(discontinuedWithAltsActualDescValues.slice());
        await expect(discontinuedWithAltsExpectDescValues).toEqual(discontinuedWithAltsActualDescValues);
    });

    it('should be Clear sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Total', 'Total', 'Unique', 'Total', 'Unique', 'Total', 'Unique',
        //     'Total', 'Unique']);
        // await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'Without Alts', 'SS', 'MS']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('With Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const discontinuedWithAltsAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'With Alts');
        await grid.newGridOpenFilterBoxByName('With Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        const discontinuedWithAltsClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'With Alts');
        await expect(discontinuedWithAltsAscValues).not.toEqual(discontinuedWithAltsClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('With Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('With Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'With Alts');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(110);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('With Alts');
        await toolbar.unhideCellNameWithUnhideAll('With Alts');
    });
});
