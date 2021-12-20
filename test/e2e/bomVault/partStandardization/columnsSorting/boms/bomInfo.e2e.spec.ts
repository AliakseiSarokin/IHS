import {browser} from "protractor";
import {
    columnHeaders, meganavItems
} from "../../../../../../testData/global";
import {Grid} from "../../../../../../components/grid";
import {gridElements} from "../../../../../../elements/elements";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {Toolbar} from "../../../../../../components/toolbar";
import {PartStandardizationLogic} from "../../../../../../bussinesLayer/bomVault/partStandardizationLogic";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardisation - BOMs Tab - BOM Info column', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await partStandardizationLogic.goToBomsTab()
    });

    it('should has default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'BOM Info');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toEqual(64);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Info');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
    });

    it('should work Autosize this column option', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1],
            gridElements.newGridCheckboxSelector.last());
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'BOM Info');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber))
            .toBeCloseTo(114);
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('BOM Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1],
            gridElements.newGridCheckboxSelector.last());
        await grid.newGridOpenFilterBoxByName('BOM Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[3],
            gridElements.newGridCheckboxSelector.last());
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'BOM Info');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridUnlockHeaderCss, colNumber ))
            .toEqual(64);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('BOM Info');
        await toolbar.unhideCellNameWithUnhideAllByNumber('BOM Info', 1);
    });
});
