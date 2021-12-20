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

describe('BOM Vault - Parts column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(0, 'Parts');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 1))
            .toEqual(92);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Parts');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
            'Parts', false);
        await grid.newGridOpenFilterBoxByName('Parts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
            'Parts', true);
        const partsActualAscValues: string[] = await grid.replaceNumberValues((await grid.newGridReturnCellValuesByColumnName
        (0, 'Parts')).filter(String));
        const partsExpectAscValues: string[] = await grid.compareAscNumberValues(partsActualAscValues.slice());
        await expect(partsExpectAscValues).toEqual(partsActualAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Parts', false);
        await grid.newGridOpenFilterBoxByName('Parts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 0,
            'Parts', true);
        const partsActualDescValues: string[] = await grid.replaceNumberValues((await grid.newGridReturnCellValuesByColumnName
        (0, 'Parts')).filter(String));
        const partsExpectDescValues: string[] = await grid.compareDescNumberValues(partsActualDescValues.slice());
        await expect(partsExpectDescValues).toEqual(partsActualDescValues);
    });

    it('should be Clear sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridOpenFilterBoxByName('Last Modified');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Parts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const partsAscValues: string[] = (await grid.newGridReturnCellValuesByColumnName(0,
            'Parts')).filter(String);
        await grid.newGridOpenFilterBoxByName('Parts');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 0,
            'Parts', false);
        const partsClearValues: string[] = (await grid.newGridReturnCellValuesByColumnName(0,
            'Parts')).filter(String);
        await expect(partsClearValues).not.toEqual(partsAscValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Parts');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Parts');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(0,
            'Parts');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 1)).toEqual(92);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Parts');
        await toolbar.unhideCellNameWithUnhideAll('Parts');
    });
});
