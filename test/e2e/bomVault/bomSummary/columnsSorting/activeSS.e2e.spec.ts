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

describe('BOM Summary - Active - SS column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts']);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should have default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'SS');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(74);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('SS');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'SS', false);
        await grid.newGridOpenFilterBoxByName('SS');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'SS', true);
        const activeSSActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'SS');
        const activeSSExpectAscValues: string[] = await grid.compareAscNumberValues(activeSSActualAscValues.slice());
        await expect(activeSSExpectAscValues).toEqual(activeSSActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'SS', false);
        await grid.newGridOpenFilterBoxByName('SS');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'SS', true);
        const activeSSActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'SS');
        const activeSSExpectDescValues: string[] = await grid.compareDescNumberValues(activeSSActualDescValues.slice());
        await expect(activeSSExpectDescValues).toEqual(activeSSActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('SS');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const activeSSAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'SS');
        await grid.newGridOpenFilterBoxByName('SS');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'SS', false);
        const activeSSClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'SS');
        await expect(activeSSAscValues).not.toEqual(activeSSClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('SS');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('SS');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'SS');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(74);
    });

    it('should be option Hide and Unhide column', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts']);
        await grid.newGridHideColumnByName('SS');
        await toolbar.unhideDuplicateCellNameWithUnhideAll(0, 'Total');
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts']);
        await expect(await gridElements.newGridHeaderByName('SS').isDisplayed()).toBeTruthy();
    });
});
