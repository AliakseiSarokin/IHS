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

describe('BOM Summary - EOL - Total column', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Total', 'Total']);
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
        const eolTotalActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        const eolTotalExpectAscValues: string[] = await grid.compareAscNumberValues(eolTotalActualAscValues.slice());
        await expect(eolTotalExpectAscValues).toEqual(eolTotalActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Total', false);
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Total', true);
        const eolTotalActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        const eolTotalExpectDescValues: string[] = await grid.compareDescNumberValues(eolTotalActualDescValues.slice());
        await expect(eolTotalExpectDescValues).toEqual(eolTotalActualDescValues);
    });

    it('should be Clear sorting', async () => {

        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const eolTotalAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        await grid.newGridOpenFilterBoxByName('Total');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Total', false);
        const eolTotalClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Total');
        await expect(eolTotalAscValues).not.toEqual(eolTotalClearValues);
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
        await toolbar.unhideDuplicateCellNameWithUnhideAll(0, 'Not Matched');
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown']);
        const colNumber: number = await grid.newGridReturnGroupLabelColumnNumberByName('EOL');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderGroupCss, colNumber))
            .toEqual(184);
    });
});
