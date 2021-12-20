import {browser} from "protractor";
import {columnHeaders} from "../../../../../testData/global";
import {Grid} from "../../../../../components/grid";
import {gridElements} from "../../../../../elements/elements";
import {JsScripts} from "../../../../../utils/jsScripts";
import {Login} from "../../../../../components/login";
import {QuickSearch} from "../../../../../components/quickSearch";
import {Toolbar} from "../../../../../components/toolbar";
import {ViewAlternatesLogic} from "../../../../../bussinesLayer/partDetails/viewAlternatesLogic";

const grid: Grid = new Grid();
const login: Login = new Login();
const quickSearch: QuickSearch = new QuickSearch();
const toolbar: Toolbar = new Toolbar();
const viewAlternatesLogic: ViewAlternatesLogic = new ViewAlternatesLogic();
//skip - need work
xdescribe('Parametric Search  - Rel Info column', () => {
    beforeAll(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch('LM5001MA');
        await viewAlternatesLogic.openViewAlternatesModal(0,'Part Number');
    });

    //need to clarify width
    xit('should has default width', async () => {
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, 1))
            .toBeCloseTo(197);
    });

    it('should be sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Rel Info');
        await expect(await gridElements.newGridColumnFilterOptions.getText())
            .toEqual(columnHeaders.bom.sortOptions2);
        await grid.newGridCloseFilterBoxIfPresent();
    });

    //need to clarify width
    xit('should work Autosize this column option', async () => {
        await grid.newGridOpenFilterBoxByName('Rel Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1]);
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, 1))
            .toBeCloseTo(114);
    });

    it('should work Reset columns', async () => {
        const defaultWidth: number = await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, 1);
        await grid.newGridOpenFilterBoxByName('Rel Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[1]);
        await grid.newGridOpenFilterBoxByName('Rel Info');
        await grid.selectOptionInColumnFilter(columnHeaders.bom.sortOptions2[3]);
        await expect(await JsScripts.returnElementWidthByCssAndNumber(gridElements.newGridHeaderCss, 1))
            .toBeCloseTo(defaultWidth);
    });

    it('should has Hide and Unhide ability', async () => {
        await grid.newGridHideColumnByNameInModal('Rel Info');
        await toolbar.unhideCellNameWithUnhideAllInModal('Rel Info');
    });
})
