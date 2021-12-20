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
import {columnIdByColumnName} from "../../../../../testData/columnIdByColumnName";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();

describe('Knowledge Base - Manufacturers Knowledge Base- Knowledge Base Selected column', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.knowledgeBase,
            meganavItems.knowledgeBaseSubItems.mfrKnowledgeBase, gridElements.gridWrapper);
        await grid.newGridHideColumnsRange([ 'Accepted Mfr Name'])
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Knowledge Base Selected');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
        await await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Knowledge Base Selected');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Knowledge Base Selected');
        await grid.selectOptionInColumnFilter(columnHeaders.partStandardisation.sortOptions[3], gridElements.newGridRows.get(0));
        await grid.newGridHideColumnsRange(['Accepted Mfr Name']);
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1,"Knowledge Base Selected");
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(200);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Knowledge Base Selected');
        await toolbar.unhideCellNameWithCellValue('Knowledge Base Selected');
        await expect(await gridElements.newGridHeaderByName('Knowledge Base Selected').isDisplayed()).toBeTruthy();
    });

});
