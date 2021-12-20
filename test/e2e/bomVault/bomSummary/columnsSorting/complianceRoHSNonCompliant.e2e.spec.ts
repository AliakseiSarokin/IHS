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

describe('BOM Summary - Compliance - RoHS Non-Compliant column', () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(300000);
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Total', 'Total', 'Total']);
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
            'Without Alts', 'SS', 'Assembly Health Score']);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime)
    });

    it('should have default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'RoHS Non-Compliant');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(182);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('RoHS Non-Compliant');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'RoHS Non-Compliant', false);
        await grid.newGridOpenFilterBoxByName('RoHS Non-Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'RoHS Non-Compliant', true);
        const rohsNonCompliantActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'RoHS Non-Compliant');
        const rohsNonCompliantExpectAscValues: string[] = await grid.compareAscNumberValues(rohsNonCompliantActualAscValues.slice());
        await expect(rohsNonCompliantExpectAscValues).toEqual(rohsNonCompliantActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'RoHS Non-Compliant', false);
        await grid.newGridOpenFilterBoxByName('RoHS Non-Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'RoHS Non-Compliant', true);
        const rohsNonCompliantActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'RoHS Non-Compliant');
        const rohsNonCompliantExpectDescValues: string[] = await grid.compareDescNumberValues(rohsNonCompliantActualDescValues.slice());
        await expect(rohsNonCompliantExpectDescValues).toEqual(rohsNonCompliantActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('RoHS Non-Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const rohsNonCompliantAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'RoHS Non-Compliant');
        await grid.newGridOpenFilterBoxByName('RoHS Non-Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'RoHS Non-Compliant', false);
        const rohsNonCompliantClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'RoHS Non-Compliant');
        await expect(rohsNonCompliantAscValues).not.toEqual(rohsNonCompliantClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('RoHS Non-Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('RoHS Non-Compliant');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Total', 'Total', 'Total']);
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
            'Without Alts', 'SS', 'MS', 'Assembly Health Score']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'RoHS Non-Compliant');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(182);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('RoHS Non-Compliant');
        await toolbar.unhideCellNameWithUnhideAll('Not Matched');
        await grid.newGridHideColumnsRange(['Total', 'Total', 'Total']);
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts',
            'Without Alts', 'SS', 'MS', 'Assembly Health Score']);
        await expect(await gridElements.newGridHeaderByName('RoHS Non-Compliant').isDisplayed()).toBeTruthy();
    });
});
