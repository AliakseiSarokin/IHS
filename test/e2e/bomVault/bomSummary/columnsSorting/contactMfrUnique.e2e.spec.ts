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

describe('BOM Summary - Contact Mfr - Unique column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomSummary, gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts']);
        await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique']);
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

    it('colour of Contact Mfr group label should be blue', async () => {
        const colNumber: number = await grid.newGridReturnGroupLabelColumnNumberByName('Contact Mfr');
        await expect(await JsScripts.returnElementPropertyValueByCssAndNumber(gridElements.newGridHeaderGroupCss, colNumber,
            'background-color')).toEqual('rgb(84, 202, 245)');
    });

    it('should be ASC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Without Alts', 'SS', 'MS', 'Assembly Health Score',
        //     'RoHS Non-Compliant']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unique', false);
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unique', true);
        const reachCompliantActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        const reachCompliantExpectAscValues: string[] = await grid.compareAscNumberValues(reachCompliantActualAscValues.slice());
        await expect(reachCompliantExpectAscValues).toEqual(reachCompliantActualAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Without Alts', 'SS', 'MS', 'Assembly Health Score',
        //     'RoHS Non-Compliant']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Unique', false);
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Unique', true);
        const reachCompliantActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        const reachCompliantExpectDescValues: string[] = await grid.compareDescNumberValues(reachCompliantActualDescValues.slice());
        await expect(reachCompliantExpectDescValues).toEqual(reachCompliantActualDescValues);
    });

    it('should be Clear sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Without Alts', 'SS', 'MS', 'Assembly Health Score',
        //     'RoHS Non-Compliant']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        const reachCompliantAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unique', false);
        const reachCompliantClearValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unique');
        await expect(reachCompliantAscValues).not.toEqual(reachCompliantClearValues);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Unique');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts']);
        await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Unique');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(98);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideDuplicateColumnByName('Unique');
        await toolbar.unhideDuplicateCellNameWithUnhideAll(0, 'Total');
        await grid.newGridHideColumnsRange(['Not Matched', 'Unknown', 'Sub-Assemblies', 'With Alts']);
        await grid.newGridHideColumnsRange(['Unique', 'Unique', 'Unique']);
        const colNumber: number = await grid.newGridReturnGroupLabelColumnNumberByName('Contact Mfr');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderGroupCss, colNumber))
            .toEqual(184);
    });
});
