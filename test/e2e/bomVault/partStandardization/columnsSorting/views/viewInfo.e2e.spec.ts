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

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('Part Standardisation - Views Tab - View Info column', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
    });

    it('should have default width', async () => {
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,
            'View Info');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(64);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('View Info');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.partStandardisation.sortOptions);
    });


    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('View Info');
        await grid.selectOptionInColumnFilter(columnHeaders.partStandardisation.sortOptions[1], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('View Info');
        await grid.selectOptionInColumnFilter(columnHeaders.partStandardisation.sortOptions[3], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'View Info');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(64);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('View Info');
        await toolbar.unhideCellNameWithUnhideAll('View Info');
        await expect(await gridElements.newGridHeaderByName('View Info').isDisplayed()).toBeTruthy();
    });
});
