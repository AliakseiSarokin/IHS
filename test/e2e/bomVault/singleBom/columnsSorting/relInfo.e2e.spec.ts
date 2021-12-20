import {browser} from "protractor";
import {
    columnHeaders, commonData, meganavItems
} from "../../../../../testData/global";
import {Grid} from "../../../../../components/grid";
import {gridElements} from "../../../../../elements/elements";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {SingleBomLogic} from "../../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../../components/toolbar";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();

describe('BOM Details - Rel. Info column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridRows.get(0));
        await singleBomLogic.openSingleBomByName(commonData.bomNameWithIcons);
    });

    beforeEach(async () => {
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Rel. Info');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
    });

    it('should work Reset columns', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(0, 'Rel. Info');
        const defaultWidth: number = await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber + 1);
        await grid.newGridOpenFilterBoxByName('Rel. Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Rel. Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[3], gridElements.newGridRows.get(0));
        await expect(Math.abs(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, colNumber + 1) - defaultWidth))
            .toBeLessThanOrEqual(defaultWidth);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Rel. Info');
        await toolbar.unhideCellNameWithUnhideAll('Rel. Info');
    });
});
