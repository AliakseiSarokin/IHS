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

describe('BOM Summary - Unknown column', () => {

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
            'Unknown');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(112);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Unknown');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions);
    });

    it('should be ASC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Total', 'Total', 'Unique', 'Total', 'Unique', 'Total', 'Unique',
        //     'Total', 'Unique']);
        // await grid.newGridHideColumnsRange(['Not Matched', 'Sub-Assemblies', 'With Alts', 'Without Alts', 'SS', 'MS']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unknown', false);
        await grid.newGridOpenFilterBoxByName('Unknown');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unknown', true);
        const unknownActualAscValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unknown');
        const unknownExpectAscValues: string[] = await grid.compareAscNumberValues(unknownActualAscValues.slice());
        await expect(unknownExpectAscValues).toEqual(unknownActualAscValues);
    });

    it('should be DESC sorting', async () => {
        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Total', 'Total', 'Unique', 'Total', 'Unique', 'Total', 'Unique',
        //     'Total', 'Unique']);
        // await grid.newGridHideColumnsRange(['Not Matched', 'Sub-Assemblies', 'With Alts', 'Without Alts', 'SS', 'MS']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Unknown', false);
        await grid.newGridOpenFilterBoxByName('Unknown');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('DESC', 1,
            'Unknown', true);
        const unknownActualDescValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
            'Unknown');
        const unknownExpectDescValues: string[] = await grid.compareDescNumberValues(unknownActualDescValues.slice());
        await expect(unknownExpectDescValues).toEqual(unknownActualDescValues);
    });

    it('should be Clear sorting', async () => { //these test is failed because we can't check
        // that Match Status column contains different values before and after use Clear sorting option
        // (we don't have any Bom with different Unknown values)

        // next steps do not needed because default column sorting reset after apply new column sorting,
        // we can not use several columns sorting at the same time

        // await grid.newGridHideColumnsRange(['Total', 'Total', 'Unique', 'Total', 'Unique', 'Total', 'Unique',
        //     'Total', 'Unique']);
        // await grid.newGridHideColumnsRange(['Not Matched', 'Sub-Assemblies', 'With Alts', 'Without Alts', 'SS', 'MS']);
        // await grid.newGridOpenFilterBoxByName('Modified Date');
        // await grid.switchToSortColumnMenu();
        // await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Unknown');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Unknown');
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.clearSort, gridElements.newGridRows.get(0));
        await grid.newGridCheckSortingIconPresentInColumnHeaderByColumnName('ASC', 1,
            'Unknown', false);
        await expect(await gridElements.ascSortHeaderIconByName('Unknown').isDisplayed()).toBeFalsy();
        await expect(await gridElements.descSortHeaderIconByName('Unknown').isDisplayed()).toBeFalsy();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Unknown');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Unknown');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'Unknown');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 3)).toEqual(112);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Unknown');
        await toolbar.unhideCellNameWithUnhideAll('Unknown');
    });
});
