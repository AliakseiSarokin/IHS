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

describe('BOM Summary - Not Matched column', () => {

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
            'Not Matched');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(134);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Not Matched');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Not Matched', false);
        await grid.newGridOpenFilterBoxByName('Not Matched');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Not Matched', true);
        const notMatchedActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Not Matched');
        const notMatchedExpectAscValues: string[] = await grid.compareAscNumberValues(notMatchedActualAscValues.slice());
        await expect(notMatchedExpectAscValues).toEqual(notMatchedActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Not Matched', false);
        await grid.newGridOpenFilterBoxByName('Not Matched');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Not Matched', true);
        const notMatchedActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Not Matched');
        const notMatchedExpectDescValues: string[] = await grid.compareDescNumberValues(notMatchedActualDescValues.slice());
        await expect(notMatchedExpectDescValues).toEqual(notMatchedActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Not Matched');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const notMatchedAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Not Matched');
        await grid.newGridOpenFilterBoxByName('Not Matched');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Not Matched', false);
        const notMatchedClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Not Matched');
        await expect(notMatchedAscValues).not.toEqual(notMatchedClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Not Matched');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Not Matched');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Not Matched');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(134);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Not Matched');
        await toolbar.unhideCellNameWithUnhideAll('Not Matched');
    });
});
