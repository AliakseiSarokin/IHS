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

describe('BOM Summary - Assembly Health Score column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts']);
        await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique', 'Unique']);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should have default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Assembly Health Score');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(136);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Assembly Health Score');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Assembly Health Score', false);
        await grid.newGridOpenFilterBoxByName('Assembly Health Score');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Assembly Health Score', true);
        const reachCompliantActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Assembly Health Score');
        const reachCompliantExpectAscValues: string[] = await grid.compareAscNumberValues(reachCompliantActualAscValues.slice());
        await expect(reachCompliantExpectAscValues).toEqual(reachCompliantActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Assembly Health Score', false);
        await grid.newGridOpenFilterBoxByName('Assembly Health Score');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Assembly Health Score', true);
        const reachCompliantActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Assembly Health Score');
        const reachCompliantExpectDescValues: string[] = await grid.compareDescNumberValues(reachCompliantActualDescValues.slice());
        await expect(reachCompliantExpectDescValues).toEqual(reachCompliantActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Assembly Health Score');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const reachCompliantAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Assembly Health Score');
        await grid.newGridOpenFilterBoxByName('Assembly Health Score');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Assembly Health Score', false);
        const reachCompliantClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Assembly Health Score');
        await expect(reachCompliantAscValues).not.toEqual(reachCompliantClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Assembly Health Score');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Assembly Health Score');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts']);
        await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique', 'Unique']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Assembly Health Score');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(136);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Assembly Health Score');
        await toolbar.unhideCellNameWithUnhideAll('Not Matched');
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts']);
        await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique', 'Unique']);
        await expect(await gridElements.newGridHeaderByName('Assembly Health Score').isDisplayed()).toBeTruthy();
    });
});
