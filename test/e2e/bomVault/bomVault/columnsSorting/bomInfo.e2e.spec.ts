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

describe('BOM Vault - BOM Info column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Info');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
    });

    it('should work Autosize this column option', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1],
            gridElements.newGridCheckboxSelector.get(0));
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, 1))
            .toBeCloseTo(114);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1],
            gridElements.newGridCheckboxSelector.get(0));
        await grid.newGridOpenFilterBoxByName('BOM Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[3],
            gridElements.newGridCheckboxSelector.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(0, 'BOM Info');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 1))
            .toEqual(64);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('BOM Info');
        await toolbar.unhideCellNameWithUnhideAll('BOM Info');
    });
});
