import {browser} from "protractor";
import {commonSearch} from "../../../../testData/search";
import {Login} from "../../../../components/login";
import {GetPerformanceLogs} from "../../../../utils/getPerformanceLogs";
import {QuickSearch} from "../../../../components/quickSearch";
import {Grid} from "../../../../components/grid";
import {buttonNames, columnHeaders} from "../../../../testData/global";
import {Modal} from "../../../../components/modal";
import {Toolbar} from "../../../../components/toolbar";
import {async} from "q";
import {user} from "../../../../api/testData/global";
import {WorkspaceBoms} from "../../../../api/logicLayer/workspaceBoms";
import {gridElements} from "../../../../elements/elements";

const login: Login = new Login();
const quickSearch: QuickSearch = new QuickSearch();
const grid: Grid = new Grid();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();

describe('Add Parts to BOMs - defects', () => {

    beforeAll(async ()=> {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await WorkspaceBoms.addABomToWorkspaceIfNotAdded(user.groupAdmin)
    });

    it("shouldn't be possibility to hide column", async () => {
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await grid.checkCheckboxRange(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await grid.newGridOpenFilterBoxByName('BOM Name');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions3);
        await grid.newGridCloseFilterBoxIfPresent();
        await grid.newGridOpenFilterBoxByName('Workspace Comments');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions3);
        await grid.newGridCloseFilterBoxIfPresent();
        await grid.newGridOpenFilterBoxByName('BOM Path');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions3);
        await grid.newGridCloseFilterBoxIfPresent();
        await grid.newGridOpenFilterBoxByName('Date Added');
        await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions3);
        await grid.newGridCloseFilterBoxIfPresent();
    });

});
