import {browser} from "protractor";
import {columnIdByColumnName} from "../../../../../../testData/columnIdByColumnName";
import {MatchPartsLogic} from "../../../../../../bussinesLayer/bomVault/matchPartsLogic";
import {Toolbar} from "../../../../../../components/toolbar";
import {Meganav} from "../../../../../../components/meganav";
import {Login} from "../../../../../../components/login";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {gridElements} from "../../../../../../elements/elements";
import {Grid} from "../../../../../../components/grid";
import {Button} from "../../../../../../components/simple/button";
import {columnHeaders, meganavItems} from "../../../../../../testData/global";

const button: Button = new Button();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const matchPartsLogic = new MatchPartsLogic();

describe('View Single BOM /Match Parts tab - Matched Part Number/ Column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));
        await matchPartsLogic.goToMatchParts();
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Part Number');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Part Number');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Matched Part Number');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions[5], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(0, 'Matched Part Number');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(160);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Matched Part Number');
        await toolbar.unhideCellNameWithUnhideAll('Matched Part Number');
        await expect(await gridElements.newGridHeaderByName('Matched Part Number').isDisplayed()).toBeTruthy();
    });
});