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

describe('BOM Summary - Discontinued - Without Alts column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideDuplicateColumnByName('Total');
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should have default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Without Alts');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(128);
    });

    it('colour of Discontinued group label should be red', async () => {
        const colNumber: number = await grid.newGridReturnGroupLabelColumnNumberByName('Discontinued');
        await expect(await JsScripts.returnElementPropertyValueByCssAndNumber(gridElements.newGridHeaderGroupCss, colNumber,
            'background-color')).toEqual('rgb(237, 43, 35)');
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Without Alts');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts', 'SS', 'MS']);
        // await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique']);
        // await grid.newGridHideColumnsRange(['Assembly Health Score', 'RoHS Non-Compliant']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Without Alts', false);
        await grid.newGridOpenFilterBoxByName('Without Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Without Alts', true);
        const discontinuedWithoutAltsActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Without Alts');
        const discontinuedWithoutAltsExpectAscValues: string[] = await grid.compareAscNumberValues(discontinuedWithoutAltsActualAscValues.slice());
        await expect(discontinuedWithoutAltsExpectAscValues).toEqual(discontinuedWithoutAltsActualAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts', 'SS', 'MS']);
        // await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique']);
        // await grid.newGridHideColumnsRange(['Assembly Health Score', 'RoHS Non-Compliant']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Without Alts', false);
        await grid.newGridOpenFilterBoxByName('Without Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Without Alts', true);
        const discontinuedWithoutAltsActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Without Alts');
        const discontinuedWithoutAltsExpectDescValues: string[] = await grid.compareDescNumberValues(discontinuedWithoutAltsActualDescValues.slice());
        await expect(discontinuedWithoutAltsExpectDescValues).toEqual(discontinuedWithoutAltsActualDescValues);
    });

    it('should be Clear sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts', 'SS', 'MS']);
        // await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique']);
        // await grid.newGridHideColumnsRange(['Assembly Health Score', 'RoHS Non-Compliant']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Without Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const discontinuedWithoutAltsAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Without Alts');
        await grid.newGridOpenFilterBoxByName('Without Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Without Alts', false);
        const discontinuedWithoutAltsClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Without Alts');
        await expect(discontinuedWithoutAltsAscValues).not.toEqual(discontinuedWithoutAltsClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Without Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Without Alts');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Without Alts');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(128);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Without Alts');
        await toolbar.unhideCellNameWithUnhideAll('Without Alts');
    });
});
