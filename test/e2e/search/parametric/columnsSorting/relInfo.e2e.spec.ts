import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders} from "../../../../../testData/global";
import {gridElements} from "../../../../../elements/elements";
import {searchElements, commonElements} from "../../../../../elements/elements";
import {Grid} from "../../../../../components/grid";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {ParametricSearchLogic} from "../../../../../bussinesLayer/search/parametricSearchLogic";
import {Toolbar} from "../../../../../components/toolbar";

const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
const toolbar: Toolbar = new Toolbar();
describe('Parametric Search  - Rel Info column', () => {
    beforeAll(async () => {
        browser.params.waitWebElementMaxTimeout = browser.params.maxElementWaitTime;
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
    });

    afterAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName(columnHeaders.search.parametric[0]);
        await expect(await gridElements.newGridColumnFilterOptions.getText())
            .toEqual(columnHeaders.bom.sortOptions2);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    xit('should work Autosize this column option', async () => {
        await grid.newGridOpenFilterBoxByName(columnHeaders.search.parametric[0]);
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1]);
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, 1))
            .toBeCloseTo(114);
    });

    it('should work Reset columns', async () => {
        const defaultWidth: number = await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, 1);
        await grid.newGridOpenFilterBoxByName(columnHeaders.search.parametric[0]);
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1]);
        await grid.newGridOpenFilterBoxByName(columnHeaders.search.parametric[0]);
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[3]);
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, 1))
            .toBeCloseTo(defaultWidth);
    });

    it('should have Hide and Unhide ability', async () => {
        await grid.newGridHideColumnByName(columnHeaders.search.parametric[0]);
        await toolbar.unhideCellNameWithUnhideAll(columnHeaders.search.parametric[0]);
    });
})