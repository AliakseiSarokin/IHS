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

describe('BOM Summary - Active - Total column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnByName('Not Matched');
        await grid.newGridHideColumnsRange(['Total', 'Total', 'Total']);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });


    it('should have default width', async () => {
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
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Total', false);
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Total', true);
        const activeTotalActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        const activeTotalExpectAscValues: string[] = await grid.compareAscNumberValues(activeTotalActualAscValues.slice());
        await expect(activeTotalExpectAscValues).toEqual(activeTotalActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Total', false);
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Total', true);
        const activeTotalActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        const activeTotalExpectDescValues: string[] = await grid.compareDescNumberValues(activeTotalActualDescValues.slice());
        await expect(activeTotalExpectDescValues).toEqual(activeTotalActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const activeTotalAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Total', false);
        const activeTotalClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        await expect(activeTotalAscValues).not.toEqual(activeTotalClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Total');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(86);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideDuplicateColumnByName('Total');
        await toolbar.unhideDuplicateCellNameWithUnhideAll(0, 'Total');
    });
});
