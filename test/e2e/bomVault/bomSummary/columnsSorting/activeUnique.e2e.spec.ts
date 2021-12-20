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

describe('BOM Summary - Active - Unique column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Total', 'Total', 'Total', 'Unique', 'Unique']);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should have default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Unique');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(98);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Unique');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('colour of Active group label should be green', async () => {
        const colNumber: number = await grid.newGridReturnGroupLabelColumnNumberByName('Active');
        await expect(await JsScripts.returnElementPropertyValueByCssAndNumber(gridElements.newGridHeaderGroupCss, colNumber,
            'background-color')).toEqual('rgb(101, 188, 69)');
    });

    it('should be ASC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unique', false);
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unique', true);
        const activeUniqueActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        const activeUniqueExpectAscValues: string[] = await grid.compareAscNumberValues(activeUniqueActualAscValues.slice());
        await expect(activeUniqueExpectAscValues).toEqual(activeUniqueActualAscValues);
    });

    it('should be DESC sorting', async () => {
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Unique', false);
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Unique', true);
        const activeUniqueActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        const activeUniqueExpectDescValues: string[] = await grid.compareDescNumberValues(activeUniqueActualDescValues.slice());
        await expect(activeUniqueExpectDescValues).toEqual(activeUniqueActualDescValues);
    });

    it('should be Clear sorting', async () => {
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const activeUniqueAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unique', false);
        const activeUniqueClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        await expect(activeUniqueAscValues).not.toEqual(activeUniqueClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Unique');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(98);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideDuplicateColumnByName('Unique');
        await toolbar.unhideDuplicateCellNameWithUnhideAll(0, 'Total');
    });
});
