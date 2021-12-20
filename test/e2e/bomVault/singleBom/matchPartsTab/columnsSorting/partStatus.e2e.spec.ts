import {browser} from "protractor";
import {MatchPartsLogic} from "../../../../../../bussinesLayer/bomVault/matchPartsLogic";
import {Toolbar} from "../../../../../../components/toolbar";
import {Meganav} from "../../../../../../components/meganav";
import {Login} from "../../../../../../components/login";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {gridElements} from "../../../../../../elements/elements";
import {Grid} from "../../../../../../components/grid";
import {columnHeaders, meganavItems} from "../../../../../../testData/global";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const matchPartsLogic = new MatchPartsLogic();

describe('View Single BOM /Match Parts tab - Part Status/ Column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
        await matchPartsLogic.goToMatchParts();
        await grid.newGridOpenFilterBoxByName('Part Status');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange([ 'Imported Part Number', 'Matched Part Number','Imported Manufacturer Name', 'Matched Manufacturer Name','Imported Part Description', 'Internal Part Number'])
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Part Status');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Part Status');
        await toolbar.unhideCellNameWithCellValue('Part Status');
        await expect(await gridElements.newGridHeaderByName('Part Status').isDisplayed()).toBeTruthy();
    });

    it('should work Reset columns', async () => {
        const colNumberBeforeReset: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Part Status');
        let number = await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumberBeforeReset+1);
        await grid.newGridOpenFilterBoxByName('Part Status');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Part Status');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Part Status');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+3)).toEqual(number);
    });

});