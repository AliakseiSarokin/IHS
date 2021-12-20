import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems} from "../../../../../../testData/global";
import {Button} from "../../../../../../components/simple/button";
import {Grid} from "../../../../../../components/grid";
import {gridElements, pageTitles} from "../../../../../../elements/elements";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {JsScripts} from "../../../../../../utils/jsScripts";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {Toolbar} from "../../../../../../components/toolbar";
import {Link} from "../../../../../../components/simple/link";

const button: Button = new Button();
const grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const toolbar: Toolbar = new Toolbar();
const link: Link = new Link();

describe('CPL Alerts tab- Matched Manufacturer Name - column sorting', () => {

    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.cplMatchMfr, gridElements.grid);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Manufacturer Name');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    it('should work Reset columns', async () => {
        await grid.newGridOpenFilterBoxByName('Matched Manufacturer Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1], gridElements.newGridRows.get(0));
        await grid.newGridOpenFilterBoxByName('Matched Manufacturer Name');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[3], gridElements.newGridRows.get(0));
        const colNumber: number = await grid.newGridReturnColumnNumberByColumnName(1, 'Matched Manufacturer Name');
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss,
            colNumber+1)).toEqual(254);
    });

    it('should be option Hide and Unhide column', async () => {
        await grid.newGridHideColumnByName('Matched Manufacturer Name');
        await toolbar.unhideCellNameWithCellValue('Matched Manufacturer Name');
        await expect(await gridElements.newGridHeaderByName('Matched Manufacturer Name').isDisplayed()).toBeTruthy();
    });
});
