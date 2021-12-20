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
import {JasmineTimeout} from "../../../../../helper/jasmineTimeout";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('BOM Summary - Compliance - REACH Compliant column', () => {



    afterAll(async() => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });
    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(300000);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary,  gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Total', 'Total', 'Total']);
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
            'Without Alts', 'SS', 'MS', 'Assembly Health Score', 'RoHS Non-Compliant']);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should have default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'REACH Compliant');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(164);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('REACH Compliant');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'REACH Compliant', false);
        await grid.newGridOpenFilterBoxByName('REACH Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'REACH Compliant', true);
        const reachCompliantActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'REACH Compliant');
        const reachCompliantExpectAscValues: string[] = await grid.compareAscNumberValues(reachCompliantActualAscValues.slice());
        await expect(reachCompliantExpectAscValues).toEqual(reachCompliantActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'REACH Compliant', false);
        await grid.newGridOpenFilterBoxByName('REACH Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'REACH Compliant', true);
        const reachCompliantActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'REACH Compliant');
        const reachCompliantExpectDescValues: string[] = await grid.compareDescNumberValues(reachCompliantActualDescValues.slice());
        await expect(reachCompliantExpectDescValues).toEqual(reachCompliantActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('REACH Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const reachCompliantAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'REACH Compliant');
        await grid.newGridOpenFilterBoxByName('REACH Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'REACH Compliant', false);
        const reachCompliantClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'REACH Compliant');
        await expect(reachCompliantAscValues).not.toEqual(reachCompliantClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('REACH Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('REACH Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideDuplicateColumnByName('Total');
        await grid.newGridHideDuplicateColumnByName('Total');
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
            'Without Alts', 'SS', 'MS', 'Assembly Health Score']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'REACH Compliant');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(164);
    });

    it('should be option Hide and Unhide column', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary,  gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Total', 'Total', 'Total']);
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
            'Without Alts', 'SS', 'MS', 'Assembly Health Score']);
        await grid.newGridHideColumnByName('REACH Compliant');
        await toolbar.unhideCellNameWithUnhideAll('Not Matched');
        await grid.newGridHideDuplicateColumnByName('Total');
        await grid.newGridHideDuplicateColumnByName('Total');
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
            'Without Alts', 'SS', 'MS', 'Assembly Health Score']);
        await expect(await gridElements.newGridHeaderByName('REACH Compliant').isDisplayed()).toBeTruthy();
    });
});
