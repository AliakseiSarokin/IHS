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

describe('BOM Summary - EOL - Unique column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown']);
        await grid.newGridHideDuplicateColumnByName('Unique');
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Unique');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(98);
    });

    it('colour of EOL group label should be yellow', async () => {
        const colNumber: number = await grid.newGridReturnGroupLabelColumnNumberByName('EOL');
        await expect(await JsScripts.returnElementPropertyValueByCssAndNumber(gridElements.newGridHeaderGroupCss, colNumber,
            'background-color')).toEqual('rgb(245, 235, 30)');
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Unique');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Sub-Assemblies', 'With Alts', 'Without Alts', 'SS', 'MS']);
        // await grid.newGridHideColumnsRange(['Total', 'Total']);
        // await grid.newGridHideColumnsRange(['Assembly Health Score', 'RoHS Non-Compliant']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unique', false);
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unique', true);
        const eolUniqueActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        const eolUniqueExpectAscValues: string[] = await grid.compareAscNumberValues(eolUniqueActualAscValues.slice());
        await expect(eolUniqueExpectAscValues).toEqual(eolUniqueActualAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Sub-Assemblies', 'With Alts', 'Without Alts', 'SS', 'MS']);
        // await grid.newGridHideColumnsRange(['Total', 'Total']);
        // await grid.newGridHideColumnsRange(['Assembly Health Score', 'RoHS Non-Compliant']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Unique', false);
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Unique', true);
        const eolUniqueActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        const eolUniqueExpectDescValues: string[] = await grid.compareDescNumberValues(eolUniqueActualDescValues.slice());
        await expect(eolUniqueExpectDescValues).toEqual(eolUniqueActualDescValues);
    });

    it('should be Clear sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Sub-Assemblies', 'With Alts', 'Without Alts', 'SS', 'MS']);
        // await grid.newGridHideColumnsRange(['Total', 'Total']);
        // await grid.newGridHideColumnsRange(['Assembly Health Score', 'RoHS Non-Compliant']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const eolUniqueAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unique', false);
        const eolUniqueClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        await expect(eolUniqueAscValues).not.toEqual(eolUniqueClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Unique');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(98);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideDuplicateColumnByName('Unique');
        await toolbar.unhideDuplicateCellNameWithUnhideAll(0, 'Total');
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown']);
        const colNumber: number = await grid.newGridReturnGroupLabelColumnNumberByName('EOL');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderGroupCss, colNumber))
            .toEqual(184);
    });
});
